import * as React from "react";
import {
  ExplosionProfile,
  Profile,
  PsychicPowerProfile,
  PsykerProfile,
  Selection,
  SelectionType,
  TransportProfile,
  TypeName,
  UnitProfile,
  UnknownProfile,
  WeaponProfile,
  WoundTrackProfile,
} from "../services/types";
import { ModelSelectionComponent } from "./ModelSelectionComponent";
import "../assets/scss/TopLevelSelectionComponent.scss";
import { WeaponsTableComponent } from "./WeaponsTableComponent";
import { AbilitiesTableComponent } from "./AbilitiesTableComponent";
import { SelectionInfoComponent } from "./SelectionInfoComponent";
import { UnknownProfilesComponent } from "./UnknownProfilesComponent";
import { PsychicPowerTableComponent } from "./PsychicPowerTableComponent";
import {
  isPsychicPowerProfile,
  isPsykerProfile,
  isUnitProfile,
  isWeaponProfile,
} from "../services/guards";
import { PsykerTableComponent } from "./PsykerTableComponent";
import { WoundTrackTableComponent } from "./WoundTrackTableComponent";
import { ExplodesTable } from "./ExplodesTable";
import { TransportTableComponent } from "./TransportTableComponent";

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

const getAllProfiles = (
  selection: Selection,
  acc: Profile<TypeName>[],
): Profile<TypeName>[] => {
  if (selection.selections) {
    return [
      ...acc,
      ...selection.profiles,
      ...selection.selections.flatMap((selection) => {
        return getAllProfiles(selection, acc);
      }),
    ];
  } else {
    return [...acc, ...selection.profiles];
  }
};

export const TopLevelSelectionComponent: React.FC<SelectionComponentProps> = ({
  selection,
}) => {
  const allNestedProfiles = getAllProfiles(selection, []);
  const unknownProfiles = allNestedProfiles
    .filter((i): i is UnknownProfile => i.typeName === "Unknown")
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
  const modelProfiles = allNestedProfiles
    .filter((i): i is UnitProfile => isUnitProfile(i))
    .sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  const weaponProfiles = allNestedProfiles
    .filter((i): i is WeaponProfile => isWeaponProfile(i))
    .sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  const explodesProfile = allNestedProfiles
    .filter((i): i is ExplosionProfile => i.typeName === "Explosion")
    .sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  const woundTrackProfiles = allNestedProfiles
    .filter((i): i is WoundTrackProfile => i.typeName === "Wound Track")
    .sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  const transportProfiles = allNestedProfiles
    .filter((i): i is TransportProfile => i.typeName === "Transport")
    .sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  return (
    <div className={"unit-container"} id={selection.id}>
      <SelectionInfoComponent selection={selection} />
      <div>
        <ModelSelectionComponent modelProfiles={modelProfiles} />
        <WoundTrackTableComponent profiles={woundTrackProfiles} />
        <WeaponsTableComponent profiles={weaponProfiles} />
        <AbilitiesTableComponent profiles={allNestedProfiles} />
        <PsykerTableComponent profiles={psykerProfiles} />
        <PsychicPowerTableComponent profiles={psychicPowerProfiles} />
        <ExplodesTable explodesProfiles={explodesProfile} />
        <TransportTableComponent transportProfiles={transportProfiles} />
        <UnknownProfilesComponent profiles={unknownProfiles} />
      </div>
    </div>
  );
};
