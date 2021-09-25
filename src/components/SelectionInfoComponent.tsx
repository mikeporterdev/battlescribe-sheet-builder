import * as React from "react";
import { Selection } from "../services/types";
import { CostsComponent } from "./CostsComponent";

interface SelectionInfoComponentProps {
  selection: Selection;
}

export const SelectionInfoComponent: React.FC<SelectionInfoComponentProps> = ({
  selection,
}) => {
  const rules = selection.rules;
  const categories = selection.categories;
  const nestedSelections = selection.selections.filter(
    (sel) => sel.type === "unit" || sel.type === "model",
  );

  const upgradeSelections = selection.selections.filter(
    (sel) => sel.type === "upgrade",
  );

  console.log("selection", selection);

  const upgrades = selection.selections.filter((sel) => !sel.selections.length);
  return (
    <div className={"nested-selection"} id={selection.id}>
      <h4 className={"unit-name"}>
        {selection.number > 1 && `${selection.number}x `}
        {selection.name}
        <CostsComponent costs={selection.costs} />
      </h4>
      {!!rules.length && (
        <div>
          <b>Rules: </b>
          {rules.map((rule) => rule.name).join(", ")}
        </div>
      )}
      {!!categories.length && (
        <div>
          <b>Categories: </b>
          {categories.map((category) => category.name).join(", ")}
        </div>
      )}
      {!!upgrades.length && (
        <div>
          <b>Selections: </b>
          {upgrades.map((selection) => selection.name).join(", ")}
        </div>
      )}
      {nestedSelections.map((sel) => (
        <SelectionInfoComponent selection={sel} />
      ))}
    </div>
  );
};
