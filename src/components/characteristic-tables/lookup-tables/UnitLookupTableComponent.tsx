import * as React from "react";
import {
  AbilityProfile,
  UnitProfile,
  WeaponProfile,
} from "../../../services/types";
import { ProfileComponent } from "../ProfileComponent";

export interface UnitLookupTableComponentInput {
  rows: {
    modelProfiles: UnitProfile[];
    abilities: AbilityProfile[];
    weapons: WeaponProfile[];
  }[];
}

export const UnitLookupTableComponent = ({
  rows,
}: UnitLookupTableComponentInput) => {
  console.log(rows);
  // const modelProfiles = rows.map((i) => i.modelProfiles);
  // return <ModelSelectionComponent modelProfiles={modelProfiles} />;
  return (
    <>
      {!!rows.length && (
        <table>
          <thead>
            <tr>
              <th>Models</th>
              <th>M</th>
              <th>WS</th>
              <th>BS</th>
              <th>S</th>
              <th>T</th>
              <th>W</th>
              <th>A</th>
              <th>Ld</th>
              <th>Save</th>
              <th>Abilities</th>
              <th>Weapons</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <>
                {row.modelProfiles.map((prof) => {
                  return (
                    <tr key={`model-lookup-table-${prof.id}`}>
                      <ProfileComponent
                        profile={prof}
                        abilities={row.abilities}
                        weapons={row.weapons}
                      />
                    </tr>
                  );
                })}
              </>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
