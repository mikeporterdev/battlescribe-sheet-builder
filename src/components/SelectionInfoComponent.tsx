import * as React from "react";
import { Category, Profile, Selection, TypeName } from "../services/types";
import { CostsComponent } from "./CostsComponent";
import { sortByName } from "../utils/sort-by-name";
import groupBy from "lodash/groupBy";
import { CategoriesComponent } from "./CategoriesComponent";

interface SelectionInfoComponentProps {
  selection: Selection;
  qty?: number;
}

export const getAllCategories = (
  selection: Selection,
  acc: Category[],
): Category[] => {
  if (selection.selections) {
    return [
      ...acc,
      ...selection.categories,
      ...selection.selections.flatMap((selection) => {
        return getAllCategories(selection, acc);
      }),
    ];
  } else {
    return [...acc, ...selection.categories];
  }
};

export const SelectionInfoComponent: React.FC<SelectionInfoComponentProps> = ({
  selection,
  qty,
}) => {
  const rules = selection.rules;
  const categories = getAllCategories(selection, []).filter(
    (val, id, array) => {
      return array.map((i) => i.name).indexOf(val.name) == id;
    },
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
    <div className={"selection-container"}>
      <h4 className={"unit-name"}>
        {qty > 1 && `${qty}x `}
        {selection.name}
        <CostsComponent costs={selection.costs} />
      </h4>

      <div className={"nested-selection"} id={selection.id}>
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
              <CategoriesComponent categories={categories} />
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
    </div>
  );
};
