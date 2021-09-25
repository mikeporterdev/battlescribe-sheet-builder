import * as React from "react";
import { Category } from "../services/types";
import { CategoryComponent } from "./CategoryComponent";
import { sortByName } from "../utils/sort-by-name";

interface CategoriesComponentProps {
  categories: Category[];
}

export const CategoriesComponent: React.FC<CategoriesComponentProps> = ({
  categories,
}) => {
  return (
    <>
      <b>Categories: </b>
      {categories.sort(sortByName).map((category) => (
        <>
          <CategoryComponent category={category} />,{" "}
        </>
      ))}
    </>
  );
};
