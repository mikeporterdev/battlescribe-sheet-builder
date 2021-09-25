export const sortByName = <T extends { name: string }>(a: T, b: T): number => {
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
};
