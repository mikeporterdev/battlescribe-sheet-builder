import * as React from "react";
import { Selection } from "../services/types";
import { CostsComponent } from "./CostsComponent";
import { sortByName } from "../utils/sort-by-name";
import groupBy from "lodash/groupBy";

interface SelectionInfoComponentProps {
  selection: Selection;
  qty?: number;
}

export const SelectionInfoComponent: React.FC<SelectionInfoComponentProps> = ({
  selection,
  qty,
}) => {
  const rules = selection.rules;
  const categories = selection.categories;
  const nestedSelections = selection.selections.filter(
    (sel) => sel.type === "unit" || sel.type === "model",
  );

  const upgradeSelections = selection.selections.filter(
    (sel) => sel.type === "upgrade",
  );

  const groupedSelections: { [key: string]: Selection[] } = groupBy(
    selection.selections.filter((sel) => sel.selections.length),
    (sel) => {
      return (
        sel.name +
        sel.selections
          .sort(sortByName)
          .map((sel1) => sel1.name)
          .join()
      );
    },
  );

  return (
    <div className={"nested-selection"} id={selection.id}>
      <h4 className={"unit-name"}>
        {qty > 1 && `${qty}x `}
        {selection.name}
        <CostsComponent costs={selection.costs} />
      </h4>
      <div className={"nested-selection-stats"}>
        {!!rules.length && (
          <div>
            <b>Rules: </b>
            {rules
              .sort(sortByName)
              .map((rule) => rule.name)
              .join(", ")}
          </div>
        )}
        {!!categories.length && (
          <div>
            <b>Categories: </b>
            {categories
              .sort(sortByName)
              .map((category) => category.name)
              .join(", ")}
          </div>
        )}
        {!!upgradeSelections.length && (
          <div>
            <b>Selections: </b>
            {upgradeSelections
              .sort(sortByName)
              .map((selection) => selection.name)
              .join(", ")}
          </div>
        )}
        {Object.keys(groupedSelections).map((sel) => (
          <SelectionInfoComponent
            selection={groupedSelections[sel][0]}
            qty={groupedSelections[sel].reduce(
              (acc, sel2) => sel2.number + acc,
              0,
            )}
          />
        ))}
      </div>
    </div>
  );
};
