import * as React from "react";
import {
  Profile,
  PsychicPowerProfile,
  PsykerProfile,
  Selection,
  SelectionType,
} from "../services/types";
import { ModelSelectionComponent } from "./ModelSelectionComponent";
import "../assets/scss/TopLevelSelectionComponent.scss";
import { WeaponsTableComponent } from "./WeaponsTableComponent";
import { AbilitiesTableComponent } from "./AbilitiesTableComponent";
import { SelectionInfoComponent } from "./SelectionInfoComponent";
import { UnknownProfilesComponent } from "./UnknownProfilesComponent";
import { PsychicPowerTableComponent } from "./PsychicPowerTableComponent";
import {
  isBSPsychicPowerProfile,
  isPsychicPowerProfile,
  isPsykerProfile,
} from "../services/guards";
import { PsykerTableComponent } from "./PsykerTableComponent";
interface SelectionComponentProps {
  selection: Selection;
}

const findSelectionsByType = (
  selection: Selection,
  acc: Selection[],
  selectionType: SelectionType,
): Selection[] => {
  if (selection.type === selectionType) {
    return [
      ...acc,
      selection,
      ...selection.selections.flatMap((sel) =>
        findSelectionsByType(sel, acc, selectionType),
      ),
    ];
  } else if (!selection.selections.length) {
    return acc;
  } else {
    return [
      ...acc,
      ...selection.selections.flatMap((sel) =>
        findSelectionsByType(sel, acc, selectionType),
      ),
    ];
  }
};

const getAllProfiles = (selection: Selection, acc: Profile<any>[]) => {
  if (selection.selections) {
    return [
      ...acc,
      ...selection.profiles,
      ...selection.selections.flatMap((selection) => {
        return getAllProfiles(selection, acc);
      }),
    ];
  } else {
    return [...acc, selection.profiles];
  }
};

export const TopLevelSelectionComponent: React.FC<SelectionComponentProps> = ({
  selection,
}) => {
  const modelSelections = findSelectionsByType(selection, [], "model");
  const weaponSelections = findSelectionsByType(selection, [], "upgrade");
  const allNestedProfiles = getAllProfiles(selection, []);
  const unknownProfiles = allNestedProfiles
    .filter((i) => i.typeName === "Unknown")
    .sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  const psychicPowerProfiles = allNestedProfiles
    .filter((i): i is PsychicPowerProfile => isPsychicPowerProfile(i))
    .sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  const psykerProfiles = allNestedProfiles
    .filter((i): i is PsykerProfile => isPsykerProfile(i))
    .sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  return (
    <div className={"unit-container"} id={selection.id}>
      <SelectionInfoComponent selection={selection} />
      <div>
        <ModelSelectionComponent selections={modelSelections} />
        <WeaponsTableComponent selections={weaponSelections} />
        <AbilitiesTableComponent profiles={allNestedProfiles} />
        <PsykerTableComponent profiles={psykerProfiles} />
        <PsychicPowerTableComponent profiles={psychicPowerProfiles} />
        <UnknownProfilesComponent profiles={unknownProfiles} />
      </div>
    </div>
  );
};
