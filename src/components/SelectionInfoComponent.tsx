import * as React from "react";
import { ModelSelectionComponent } from "./ModelSelectionComponent";
import { WeaponsTableComponent } from "./WeaponsTableComponent";
import { AbilitiesTableComponent } from "./AbilitiesTableComponent";
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
      {nestedSelections.map((sel) => (
        <SelectionInfoComponent selection={sel} />
      ))}
    </div>
  );
};
