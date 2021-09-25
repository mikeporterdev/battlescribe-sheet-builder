import * as React from "react";
import { UnitProfile } from "../../services/types";
import { ProfileComponent } from "./ProfileComponent";
import "../../assets/scss/ModelTable.scss";

interface ModelSelectionComponentProps {
  modelProfiles: UnitProfile[];
}

export const ModelSelectionComponent: React.FC<ModelSelectionComponentProps> = (
  props,
) => {
  const profiles = props.modelProfiles
    .filter((val, id, array) => {
      return array.map((i) => i.name).indexOf(val.name) == id;
    })
    .sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
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
