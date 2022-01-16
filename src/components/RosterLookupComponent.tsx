import * as React from "react";
import { Roster, UnitProfile, WeaponProfile } from "../services/types";
import { getAllProfiles } from "./TopLevelSelectionComponent";
import { isUnitProfile, isWeaponProfile } from "../services/guards";
import { UnitLookupTableComponent } from "./characteristic-tables/lookup-tables/UnitLookupTableComponent";
import { AbilitiesTableComponent } from "./characteristic-tables/AbilitiesTableComponent";
import { WeaponsTableComponent } from "./characteristic-tables/WeaponsTableComponent";

interface RosterLookupComponentInput {
  roster: Roster;
}

export const RosterLookupComponent = ({
  roster,
}: RosterLookupComponentInput) => {
  const allProfiles = roster.forces.flatMap((force) =>
    force.selections.flatMap((selection) => getAllProfiles(selection, [])),
  );
  const modelProfiles = allProfiles
    .filter((i): i is UnitProfile => isUnitProfile(i))
    .sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });

  const weaponProfiles = allProfiles
    .filter((i): i is WeaponProfile => isWeaponProfile(i))
    .sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  console.log({ allProfiles: allProfiles });
  return (
    <>
      <UnitLookupTableComponent modelProfiles={modelProfiles} />
      <WeaponsTableComponent weapons={weaponProfiles} />
      <AbilitiesTableComponent profiles={allProfiles} />
    </>
  );
};
