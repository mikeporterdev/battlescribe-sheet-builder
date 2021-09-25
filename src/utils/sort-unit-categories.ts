import { Selection } from "../services/types";
import groupBy from "lodash/groupBy";

const orderPrio = [
  "Configuration",
  "Primarch | Daemon Primarch | Supreme Commander",
  "HQ",
  "Troops",
  "Elites",
  "Fast Attack",
  "Heavy Support",
  "Dedicated Transport",
  "No Force Org Slot",
];

export const sortUnitCategories = (categoryA: string, categoryB: string) => {
  const aIndex = orderPrio.indexOf(categoryA);
  const bIndex = orderPrio.indexOf(categoryB);
  return aIndex < bIndex ? -1 : aIndex > bIndex ? 1 : 0;
};

export const sortSelectionUnitCategories = (
  selectionA: Selection,
  selectionB: Selection,
) => {
  console.log(selectionA);
  console.log(selectionB);

  // a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  const aIndex = orderPrio.indexOf(
    selectionA.categories.find((cat) => cat.primary).name,
  );
  const bIndex = orderPrio.indexOf(
    selectionB.categories.find((cat) => cat.primary).name,
  );
  return aIndex < bIndex ? -1 : aIndex > bIndex ? 1 : 0;
};
