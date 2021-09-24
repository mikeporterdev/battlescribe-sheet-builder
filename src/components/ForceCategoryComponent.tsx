import * as React from "react";
import { Selection } from "../services/types";
import { TopLevelSelectionComponent } from "./TopLevelSelectionComponent";
interface ForceCategoryComponentProps {
  categoryName: string;
  selections: Selection[];
}

export const ForceCategoryComponent: React.FC<ForceCategoryComponentProps> = (
  props,
) => {
  return (
    <div>
      <h2>{props.categoryName}</h2>
      <div>
        {props.selections.map((selection) => (
          <TopLevelSelectionComponent
            key={selection.name}
            selection={selection}
          />
        ))}
      </div>
    </div>
  );
};
