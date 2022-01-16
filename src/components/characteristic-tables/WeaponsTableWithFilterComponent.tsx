import * as React from "react";
import { useState } from "react";
import { WeaponProfile } from "../../services/types";
import { isWeaponProfile } from "../../services/guards";
import { WeaponsTableComponent } from "./WeaponsTableComponent";

interface WeaponsTableProps {
  profiles: WeaponProfile[];
}

const meleeTypes = ["Pistol", "Melee"];
const rangedTypes = [
  "Pistol",
  "Assault",
  "Rapid Fire",
  "Heavy",
  "Grenade",
  "Dakka",
];

export const WeaponsTableWithFilterComponent: React.FC<WeaponsTableProps> = ({
  profiles,
}) => {
  const [showTypes, setShowTypes] = useState<{
    melee: boolean;
    ranged: boolean;
  }>({ melee: true, ranged: true });

  const allWeapons = profiles
    .filter((profile): profile is WeaponProfile => isWeaponProfile(profile))
    .filter((val, id, array) => {
      return array.map((i) => i.name).indexOf(val.name) == id;
    });

  if (!allWeapons.length) {
    return null;
  }

  const filteredWeapons = allWeapons
    .filter((profiles) => {
      if (!showTypes.melee) {
        return !meleeTypes.some((type) => profiles.type.includes(type));
      }
      return true;
    })
    .filter((profiles) => {
      if (!showTypes.ranged) {
        return !rangedTypes.some((type) => profiles.type.includes(type));
      }
      return true;
    })
    .sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });

  const handleChange = (type) => {
    setShowTypes({ ...showTypes, [type]: !showTypes[type] });
  };
  return (
    <>
      <label style={{ marginRight: "8px" }}>
        <input
          type={"checkbox"}
          defaultChecked={showTypes.ranged}
          onChange={() => handleChange("ranged")}
        />{" "}
        Show Ranged
      </label>
      <label>
        <input
          type={"checkbox"}
          defaultChecked={showTypes.melee}
          onChange={() => handleChange("melee")}
        />{" "}
        Show Melee
      </label>
      {!!filteredWeapons.length && (
        <WeaponsTableComponent weapons={filteredWeapons} />
      )}
    </>
  );
};
