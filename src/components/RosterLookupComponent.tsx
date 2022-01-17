import * as React from "react";
import {
  AbilityProfile,
  Roster,
  UnitProfile,
  WeaponProfile,
} from "../services/types";
import { getAllProfiles } from "./TopLevelSelectionComponent";
import {
  isAbilityProfile,
  isUnitProfile,
  isWeaponProfile,
} from "../services/guards";
import { UnitLookupTableComponent } from "./characteristic-tables/lookup-tables/UnitLookupTableComponent";
import { AbilitiesTableComponent } from "./characteristic-tables/AbilitiesTableComponent";
import { WeaponsTableComponent } from "./characteristic-tables/WeaponsTableComponent";
import { sortByName } from "../utils/sort-by-name";

interface RosterLookupComponentInput {
  roster: Roster;
}

export const RosterLookupComponent = ({
  roster,
}: RosterLookupComponentInput) => {
  const allProfiles = roster.forces.flatMap((force) =>
    force.selections.flatMap((selection) => getAllProfiles(selection, [])),
  );

  const selections = roster.forces.flatMap((force) => force.selections);

  const modelLookupRows = {
    rows: selections.map((selection) => {
      const profiles = getAllProfiles(selection, []);
      return {
        modelProfiles: profiles.filter((i): i is UnitProfile =>
          isUnitProfile(i),
        ),
        abilities: profiles.filter((profile): profile is AbilityProfile =>
          isAbilityProfile(profile),
        ),
        weapons: profiles.filter((i): i is WeaponProfile => isWeaponProfile(i)),
      };
    }),
  };
  const weaponProfiles = allProfiles
    .filter((i): i is WeaponProfile => isWeaponProfile(i))
    .filter((val, id, array) => {
      return array.map((i) => i.name).indexOf(val.name) == id;
    })
    .sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  const abilities = allProfiles
    .filter((profile): profile is AbilityProfile => isAbilityProfile(profile))
    .filter((val, id, array) => {
      return array.map((i) => i.name).indexOf(val.name) == id;
    })
    .sort(sortByName);
  return (
    <>
      <UnitLookupTableComponent rows={modelLookupRows.rows} />
      <WeaponsTableComponent weapons={weaponProfiles} />
      <AbilitiesTableComponent profiles={abilities} />
    </>
  );
};
