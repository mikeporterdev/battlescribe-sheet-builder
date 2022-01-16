import * as React from "react";
import { UnitProfileWithSave } from "./ModelSelectionComponent";

interface ProfileComponentProps {
  profile: UnitProfileWithSave;
}

export const ProfileComponent: React.FC<ProfileComponentProps> = ({
  profile,
}) => {
  console.log(profile.invulnerableSave);
  const save = profile.invulnerableSave
    ? `${profile.save}(${profile.invulnerableSave}++)`
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
    </>
  );
};
