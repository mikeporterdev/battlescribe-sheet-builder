import * as React from "react";
import { Selection, WeaponProfile } from "../services/types";
import { isWeaponProfile } from "../services/guards";

interface WeaponsTableProps {
  selections: Selection[];
}

export const WeaponsTableComponent: React.FC<WeaponsTableProps> = ({
  selections,
}) => {
  const weapons = selections
    .flatMap((selection) => selection.profiles)
    .filter((profile): profile is WeaponProfile => isWeaponProfile(profile));
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
