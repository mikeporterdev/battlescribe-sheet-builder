import * as React from "react";
import { WeaponProfile } from "../../services/types";
import { isWeaponProfile } from "../../services/guards";

interface WeaponsTableProps {
  profiles: WeaponProfile[];
}

export const WeaponsTableComponent: React.FC<WeaponsTableProps> = ({
  profiles,
}) => {
  const weapons = profiles
    .filter((profile): profile is WeaponProfile => isWeaponProfile(profile))
    .filter((val, id, array) => {
      return array.map((i) => i.name).indexOf(val.name) == id;
    })
    .sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  return (
    <>
      {!!weapons.length && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Range</th>
              <th>Type</th>
              <th>S</th>
              <th>AP</th>
              <th>D</th>
              <th>Abilities</th>
            </tr>
          </thead>
          <tbody>
            {weapons.map((weapon) => (
              <tr key={weapon.id + "-weapon-table-row"}>
                <td>{weapon.name}</td>
                <td>{weapon.range}</td>
                <td>{weapon.type}</td>
                <td>{weapon.strength}</td>
                <td>{weapon.armourPenetration}</td>
                <td>{weapon.damage}</td>
                <td>{weapon.abilities}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
