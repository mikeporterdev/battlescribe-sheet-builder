import * as React from "react";
import { WoundTrackProfile } from "../../services/types";

interface WoundTrackTableComponentProps {
  profiles: WoundTrackProfile[];
}

export const WoundTrackTableComponent: React.FC<WoundTrackTableComponentProps> =
  ({ profiles }) => {
    if (!profiles.length) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, remainingWounds, typeName, id, ...rest } = profiles[0];

    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Wound Track</th>
              <th>Remaining Wounds</th>
              {Object.keys(rest).map((key) => (
                <th>{key.replace("Characteristic ", "C")}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile.id + "-wound-track-table-row"}>
                <td>{profile.name}</td>
                <td>{profile.remainingWounds}</td>
                {Object.keys(rest).map((key) => (
                  <td>{rest[key]}</td>
                ))}
                {/*<td>{profile.remainingWounds}</td>*/}
                {/*<td>{profile.deny}</td>*/}
                {/*<td>{profile.powersKnown}</td>*/}
                {/*<td>{profile.other}</td>*/}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };
