import * as React from "react";
import { Selection } from "../services/types";
import { ModelSelectionComponent } from "./ModelSelectionComponent";

interface SelectionComponentProps {
  selection: Selection;
}

const findModelSelections = (
  selection: Selection,
  acc: Selection[],
): Selection[] => {
  if (selection.type === "model") {
    return [...acc, selection];
  } else if (!selection.selections.length) {
    return acc;
  } else {
    return [
      ...acc,
      ...selection.selections.flatMap((sel) => findModelSelections(sel, acc)),
    ];
  }
};

export const TopLevelSelectionComponent: React.FC<SelectionComponentProps> = (
  props,
) => {
  console.log(props.selection);
  const modelSelections = findModelSelections(props.selection, []);
  return (
    <div>
      {props.selection.name}
      <div>
        {modelSelections.map((sel) => sel.number + "x " + sel.name).join(", ")}
        <ModelSelectionComponent selections={modelSelections} />
      </div>
    </div>
  );
};
