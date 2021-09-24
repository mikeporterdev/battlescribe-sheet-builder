import * as React from "react";
import { Selection, SelectionType } from "../services/types";
import { ModelSelectionComponent } from "./ModelSelectionComponent";
import "../assets/scss/TopLevelSelectionComponent.scss";
import { WeaponsTableComponent } from "./WeaponsTableComponent";
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

export const TopLevelSelectionComponent: React.FC<SelectionComponentProps> = (
  props,
) => {
  const modelSelections = findSelectionsByType(props.selection, [], "model");
  const weaponSelections = findSelectionsByType(props.selection, [], "upgrade");
  return (
    <div className={"unit-container"} id={props.selection.id}>
      {props.selection.name}
      <div>
        {modelSelections.map((sel) => sel.number + "x " + sel.name).join(", ")}
        <ModelSelectionComponent selections={modelSelections} />
        <WeaponsTableComponent selections={weaponSelections} />
      </div>
    </div>
  );
};
