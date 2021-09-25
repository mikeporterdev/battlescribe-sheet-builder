import * as React from "react";
import { Force } from "../services/types";
import { ForceCategoryComponent } from "./ForceCategoryComponent";
import { sortUnitCategories } from "../utils/sort-unit-categories";

interface ForceComponentProps {
  force: Force;
}

export const ForceComponent: React.FC<ForceComponentProps> = ({ force }) => {
  const selectionsByCategory = {};
  force.selections.forEach((selection) => {
    const primaryCategoryName = selection.categories.find(
      (category) => category.primary,
    ).name;
    const existingCategory = selectionsByCategory[primaryCategoryName];

    if (existingCategory) {
      selectionsByCategory[primaryCategoryName].push(selection);
    } else {
      selectionsByCategory[primaryCategoryName] = [selection];
    }
  });

  return (
    <div className={"force"}>
      <div className={"force-name"}>{force.name}</div>
      <div className={"rules"}>
        Rules: {force.rules.map((rule) => rule.name).join(", ")}
        {Object.keys(selectionsByCategory)
          .sort(sortUnitCategories)
          .map((categoryName) => {
            return (
              <ForceCategoryComponent
                categoryName={categoryName}
                selections={selectionsByCategory[categoryName]}
              />
            );
          })}
      </div>
    </div>
  );
};
