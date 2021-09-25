import * as React from "react";
import { Profile, UnknownProfile } from "../services/types";

interface UnknownProfilesComponentProps {
  profiles: UnknownProfile[];
}

export const UnknownProfilesComponent: React.FC<UnknownProfilesComponentProps> =
  ({ profiles }) => {
    return (
      <>
        {!!profiles.length && (
          <table>
            <thead>
              <th>{profiles[0].unexpectedTypeName}</th>
              <th>Description</th>
            </thead>
            <tbody>
              {profiles.map((profile) => (
                <tr>
                  <td>{profile.name}</td>
                  <td>{profile["Description"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    );
  };
