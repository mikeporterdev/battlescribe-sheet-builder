import * as React from "react";
import { AbilityProfile, Profile, Selection } from "../services/types";
import { isAbilityProfile } from "../services/guards";

interface AbilitiesTableComponentProps {
  profiles: Profile<any>[];
}

export const AbilitiesTableComponent: React.FC<AbilitiesTableComponentProps> =
  ({ profiles }) => {
    const abilities = profiles
      .filter((profile): profile is AbilityProfile => isAbilityProfile(profile))
      .filter((val, id, array) => {
        return array.map((i) => i.name).indexOf(val.name) == id;
      });

    return (
      <>
        {!!abilities.length && (
          <table>
            <thead>
              <th>Abilities</th>
              <th>Description</th>
            </thead>
            <tbody>
              {abilities.map((ability) => {
                return (
                  <tr>
                    <td>{ability.name}</td>
                    <td>{ability.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </>
    );
  };
