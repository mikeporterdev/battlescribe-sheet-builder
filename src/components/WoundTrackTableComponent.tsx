import * as React from "react";
import { WoundTrackProfile } from "../services/types";

interface WoundTrackTableComponentProps {
  profiles: WoundTrackProfile[];
}

export const WoundTrackTableComponent: React.FC<WoundTrackTableComponentProps> =
  ({ profiles }) => {
    return (
      <>
        {!!profiles.length && (
          <table>
            <thead>
              <tr>
                <th>Psyker</th>
                <th>Cast</th>
                <th>Deny</th>
                <th>Powers Known</th>
                <th>Other</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => (
                <tr key={profile.id + "-psychic-power-table-row"}>
                  {/*<td>{profile.name}</td>*/}
                  {/*<td>{profile.remainingWounds}</td>*/}
                  {/*<td>{profile.deny}</td>*/}
                  {/*<td>{profile.powersKnown}</td>*/}
                  {/*<td>{profile.other}</td>*/}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    );
  };
