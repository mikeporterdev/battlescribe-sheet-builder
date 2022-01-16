import * as React from "react";
import { WeaponProfile } from "../../services/types";

export interface WeaponsTableComponentInput {
  weapons: WeaponProfile[];
}

export const WeaponsTableComponent = ({
  weapons,
}: WeaponsTableComponentInput) => {
  return (
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
  );
};
