import * as React from "react";
import { Selection, UnitProfile } from "../services/types";
import { ProfileComponent } from "./ProfileComponent";
import "../assets/scss/Table.scss";
interface ModelSelectionComponentProps {
  selections: Selection[];
}

export const ModelSelectionComponent: React.FC<ModelSelectionComponentProps> = (
  props,
) => {
  const profiles = props.selections.flatMap((sel) =>
    sel.profiles.filter((profile) => profile.typeName === "Unit"),
  );
  return (
    <table>
      <tr>
        <th>Name</th>
        <th>M</th>
        <th>WS</th>
        <th>BS</th>
        <th>S</th>
        <th>T</th>
        <th>W</th>
        <th>A</th>
        <th>Ld</th>
        <th>Save</th>
      </tr>
      {profiles.map((prof: UnitProfile) => (
        <tr key={prof.name}>
          <ProfileComponent profile={prof} />
        </tr>
      ))}
    </table>
  );
};
