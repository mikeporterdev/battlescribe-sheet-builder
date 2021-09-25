import * as React from "react";
import { Selection, UnitProfile } from "../services/types";
import { ProfileComponent } from "./ProfileComponent";
import "../assets/scss/ModelTable.scss";
interface ModelSelectionComponentProps {
  selections: Selection[];
}

export const ModelSelectionComponent: React.FC<ModelSelectionComponentProps> = (
  props,
) => {
  const profiles = props.selections
    .flatMap((sel) =>
      sel.profiles.filter((profile) => profile.typeName === "Unit"),
    )
    .filter((val, id, array) => {
      return array.map((i) => i.name).indexOf(val.name) == id;
    });
  return (
    <>
      {!!profiles.length && (
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
            </tr>
          </thead>
          <tbody>
            {profiles.map((prof: UnitProfile) => (
              <tr key={`model-table-${prof.id}`}>
                <ProfileComponent profile={prof} />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
