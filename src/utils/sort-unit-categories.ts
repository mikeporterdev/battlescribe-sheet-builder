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
  // a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  const aIndex = orderPrio.indexOf(categoryA);
  const bIndex = orderPrio.indexOf(categoryB);
  return aIndex < bIndex ? -1 : aIndex > bIndex ? 1 : 0;
};
