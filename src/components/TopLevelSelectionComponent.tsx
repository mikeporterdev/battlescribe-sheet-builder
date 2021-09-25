import * as React from "react";
import { Profile, Selection, SelectionType } from "../services/types";
import { ModelSelectionComponent } from "./ModelSelectionComponent";
import "../assets/scss/TopLevelSelectionComponent.scss";
import { WeaponsTableComponent } from "./WeaponsTableComponent";
import { AbilitiesTableComponent } from "./AbilitiesTableComponent";
import { SelectionInfoComponent } from "./SelectionInfoComponent";
import { UnknownProfilesComponent } from "./UnknownProfilesComponent";
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
  const unknownProfiles = getAllProfiles(selection, []).filter(
    (i) => i.typeName === "Unknown",
  );
  console.log(unknownProfiles);
  return (
    <div className={"unit-container"} id={selection.id}>
      <SelectionInfoComponent selection={selection} />
      <div>
        <ModelSelectionComponent selections={modelSelections} />
        <WeaponsTableComponent selections={weaponSelections} />
        <AbilitiesTableComponent profiles={getAllProfiles(selection, [])} />
        <UnknownProfilesComponent profiles={unknownProfiles} />
      </div>
    </div>
  );
};
