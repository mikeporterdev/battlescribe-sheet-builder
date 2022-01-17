import * as React from "react";
import {
  AbilityProfile,
  UnitProfile,
  WeaponProfile,
} from "../../services/types";

interface ProfileComponentProps {
  profile: UnitProfile;
  abilities?: AbilityProfile[];
  weapons?: WeaponProfile[];
}

export const ProfileComponent: React.FC<ProfileComponentProps> = ({
  profile,
  abilities,
  weapons,
}) => {
  console.log(profile.invulnerableSave);
  const save = profile.invulnerableSave
    ? `${profile.save}/${profile.invulnerableSave}++`
    : profile.save;
  return (
    <>
      <td>{profile.name}</td>
      <td>{profile.movement}</td>
      <td>{profile.weaponSkill}</td>
      <td>{profile.ballisticSkill}</td>
      <td>{profile.strength}</td>
      <td>{profile.toughness}</td>
      <td>{profile.wounds}</td>
      <td>{profile.attacks}</td>
      <td>{profile.leadership}</td>
      <td>{save}</td>
      {!!abilities?.length && (
        <td>
          {abilities.map((ability) => {
            return (
              <>
                {ability.name}
                <br />
              </>
            );
          })}
        </td>
      )}
      {!!weapons?.length && (
        <td>
          {weapons.map((weapon) => {
            return (
              <>
                {weapon.name}
                <br />
              </>
            );
          })}
        </td>
      )}
    </>
  );
};
