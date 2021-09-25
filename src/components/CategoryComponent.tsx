import * as React from "react";
import { Category } from "../services/types";

interface CategoryComponentProps {
  category: Category;
}

export const CategoryComponent: React.FC<CategoryComponentProps> = (props) => {
  return <span>{props.category.name}</span>;
};
