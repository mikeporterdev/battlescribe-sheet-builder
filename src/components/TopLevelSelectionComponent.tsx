import * as React from "react";
import { Profile, Selection, SelectionType } from "../services/types";
import { ModelSelectionComponent } from "./ModelSelectionComponent";
import "../assets/scss/TopLevelSelectionComponent.scss";
import { WeaponsTableComponent } from "./WeaponsTableComponent";
import { AbilitiesTableComponent } from "./AbilitiesTableComponent";
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

export const TopLevelSelectionComponent: React.FC<SelectionComponentProps> = (
  props,
) => {
  const modelSelections = findSelectionsByType(props.selection, [], "model");
  const weaponSelections = findSelectionsByType(props.selection, [], "upgrade");
  const rules = props.selection.rules;
  return (
    <div className={"unit-container"} id={props.selection.id}>
      <h4 className={"unit-name"}>{props.selection.name}</h4>
      {!!rules.length && (
        <div>
          <b>Rules: </b>
          {rules.map((rule) => rule.name).join(", ")}
        </div>
      )}
      <div>
        {modelSelections.map((sel) => sel.number + "x " + sel.name).join(", ")}
        <ModelSelectionComponent selections={modelSelections} />
        <WeaponsTableComponent selections={weaponSelections} />
        <AbilitiesTableComponent
          profiles={getAllProfiles(props.selection, [])}
        />
      </div>
    </div>
  );
};
