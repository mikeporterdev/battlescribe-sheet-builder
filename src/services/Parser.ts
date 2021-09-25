import {
  BSCategory,
  BSCharacteristic,
  BSCost,
  BSCostType,
  BSForce,
  BSProfile,
  BSRoster,
  BSRule,
  BSSelection,
  CalculatedCosts,
  Category,
  Cost,
  CostType,
  Force,
  Profile,
  Roster,
  Rule,
  Selection,
  TypeName,
} from "./types";
import {
  isBSCategory,
  isBSCost,
  isBSCostLimit,
  isBSForce,
  isBSProfile,
  isBSPublication,
  isBSRule,
  isBSSelection,
} from "./guards";
import RawBufferLoader from "./loader/RawBufferLoader";
import ProfileFactory from "./profile/ProfileFactory";
import { v4 as uuidv4 } from "uuid";
export class Parser {
  public async parse(path: ArrayBuffer): Promise<Roster> {
    const rosterLoader = new RawBufferLoader(path);

    let bsRoster: BSRoster;
    try {
      bsRoster = await rosterLoader.load();
    } catch (error) {
      throw error;
    }

    console.log(JSON.stringify(bsRoster));

    const {
      $,
      costs: bsCosts,
      costLimits: bsCostLimits,
      forces: bsForces,
    } = bsRoster;

    return {
      id: "roster",
      gameSystemName: $.gameSystemName,
      name: $.name,
      costs: this.toCostArray(bsCosts),
      costLimits: this.toCostArray(bsCostLimits),
      forces: this.toForceArray(bsForces),
    };
  }

  private calculateCosts(selections: Selection[]): CalculatedCosts {
    const costs = {
      [CostType.PTS]: 0,
      [CostType.PL]: 0,
      [CostType.CP]: 0,
    };

    const getCost = (selection: Selection, costType: CostType): number =>
      selection.costs.find((cost) => cost.name === costType)?.value || 0;

    selections.forEach((selection) => {
      costs.pts += getCost(selection, CostType.PTS);
      costs.PL += getCost(selection, CostType.PL);
      costs.CP += getCost(selection, CostType.CP);
    });

    return costs;
  }

  private toCostArray(
    bsCosts: Array<{ cost: BSCost[] } | { costLimit: BSCost[] } | string>,
    additionalCosts: CalculatedCosts = {
      [CostType.PTS]: 0,
      [CostType.PL]: 0,
      [CostType.CP]: 0,
    },
  ): Cost[] {
    const costs: Cost[] = [];

    if (!bsCosts) return costs;

    bsCosts.forEach((bsCosts) => {
      (isBSCost(bsCosts)
        ? bsCosts.cost
        : isBSCostLimit(bsCosts)
        ? bsCosts.costLimit
        : []
      ).forEach((bsCost) => {
        let name: CostType;
        switch (bsCost.$.name) {
          case BSCostType.PTS:
            name = CostType.PTS;
            break;
          case BSCostType.CP:
            name = CostType.CP;
            break;
          case BSCostType.PL:
          default:
            name = CostType.PL;
        }

        costs.push({
          value: +bsCost.$.value + additionalCosts[name],
          name,
        });
      });
    });

    return costs;
  }

  private toForceArray(
    bsForces: Array<{ force: BSForce[] } | string>,
  ): Force[] {
    const forces: Force[] =
      bsForces?.filter(isBSForce).flatMap((bsForces) => {
        return bsForces.force.map((bsForce) => {
          const forceId = bsForce.$.name;
          return {
            id: forceId,
            name: bsForce.$.name,
            catalogueName: bsForce.$.catalogueName,
            publications: this.toPublicationArray(bsForce.publications),
            categories: this.toCategoryArray(bsForce.categories),
            forces: this.toForceArray(bsForce.forces),
            rules: this.toRuleArray(bsForce.rules),
            selections: this.toSelectionArray(bsForce.selections),
          };
        });
      }) ?? [];

    return forces;
  }

  private toPublicationArray(
    bsPublications: Array<
      { publication: Array<{ $: { name: string } }> } | string
    >,
  ): string[] {
    const publications: string[] = [];
    bsPublications?.forEach((bsPublications) => {
      if (isBSPublication(bsPublications)) {
        bsPublications.publication.forEach((bsPublication) => {
          publications.push(bsPublication.$.name);
        });
      }
    });

    return publications;
  }

  private toCategoryArray(
    bsCategories: Array<{ category: BSCategory[] } | string>,
  ): Category[] {
    const categories: Category[] = [];
    bsCategories?.forEach((bsCategories) => {
      if (isBSCategory(bsCategories)) {
        bsCategories.category.forEach((bsCategory) => {
          categories.push({
            primary: bsCategory.$.primary === "true",
            name: bsCategory.$.name,
          });
        });
      }
    });

    return categories;
  }

  private toRuleArray(bsRules: Array<{ rule: BSRule[] } | string>): Rule[] {
    const rules: Rule[] = [];

    bsRules?.forEach((bsRules) => {
      if (isBSRule(bsRules)) {
        bsRules.rule.forEach((bsRule) => {
          rules.push({
            name: bsRule.$.name,
            description: bsRule.description[0] || "-",
          });
        });
      }
    });

    return rules;
  }

  private toSelectionArray(
    bsSelections: Array<{ selection: BSSelection[] } | string>,
  ): Selection[] {
    return (
      bsSelections?.filter(isBSSelection).flatMap((bsSelections) => {
        return bsSelections.selection.map((bsSelection) => {
          const childSelections = this.toSelectionArray(bsSelection.selections);
          const selection: Selection = {
            id: uuidv4(),
            number: +bsSelection.$.number,
            type: bsSelection.$.type,
            name: bsSelection.$.name,
            customName: bsSelection.$.customName,
            customNotes: bsSelection.$.customNotes,
            categories: this.toCategoryArray(bsSelection.categories),
            rules: this.toRuleArray(bsSelection.rules),
            profiles: this.toProfileArray(bsSelection.profiles),
            selections: childSelections,
            costs: this.toCostArray(
              bsSelection.costs,
              this.calculateCosts(childSelections),
            ),
          };

          return selection;
        });
      }) ?? []
    );
  }

  private toProfileArray(
    bsProfiles: Array<{ profile: BSProfile<BSCharacteristic>[] } | string>,
  ): Profile<TypeName>[] {
    const profiles: Profile<TypeName>[] = [];
    bsProfiles?.forEach((bsProfiles) => {
      if (isBSProfile(bsProfiles)) {
        bsProfiles.profile.forEach((bsProfile) => {
          profiles.push(ProfileFactory.getProfile(bsProfile));
        });
      }
    });

    return profiles;
  }
}

export default new Parser();
