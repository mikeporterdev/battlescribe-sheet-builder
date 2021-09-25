import * as React from "react";
import { UnitProfile } from "../../services/types";

interface ProfileComponentProps {
  profile: UnitProfile;
}

export const ProfileComponent: React.FC<ProfileComponentProps> = (props) => {
  return (
    <>
      <td>{props.profile.name}</td>
      <td>{props.profile.movement}</td>
      <td>{props.profile.weaponSkill}</td>
      <td>{props.profile.ballisticSkill}</td>
      <td>{props.profile.strength}</td>
      <td>{props.profile.toughness}</td>
      <td>{props.profile.wounds}</td>
      <td>{props.profile.attacks}</td>
      <td>{props.profile.leadership}</td>
      <td>{props.profile.save}</td>
    </>
  );
};
