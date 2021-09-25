import * as React from "react";
import { Profile, UnknownProfile } from "../services/types";

interface UnknownProfilesComponentProps {
  profiles: UnknownProfile[];
}

const trimUnnecessaryKeys = (
  profile: UnknownProfile,
): Omit<UnknownProfile, "unexpectedTypeName" | "typeName" | "id" | "name"> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, unexpectedTypeName, typeName, name, ...rest } = profile;
  return { ...rest };
};

type UnknownProfilesGroups = {
  [typeName: string]: { headers: string[]; profiles: UnknownProfile[] };
};
export const UnknownProfilesComponent: React.FC<UnknownProfilesComponentProps> =
  ({ profiles }) => {
    const tables: UnknownProfilesGroups = profiles.reduce((acc, profile) => {
      if (acc[profile.unexpectedTypeName]) {
        acc[profile.unexpectedTypeName].profiles.push(profile);
      } else {
        const profileHeaders = Object.keys(trimUnnecessaryKeys(profile));
        acc[profile.unexpectedTypeName] = {
          profiles: [profile],
          headers: profileHeaders,
        };
      }
      return acc;
    }, {} as UnknownProfilesGroups);

    return (
      <>
        {Object.keys(tables).map((tableName) => {
          return (
            <>
              <table>
                <thead>
                  <th>{tableName}</th>
                  {tables[tableName].headers.map((header) => {
                    return <th>{header}</th>;
                  })}
                </thead>
                <tbody>
                  {tables[tableName].profiles.map((profile) => (
                    <tr>
                      <td>{profile.name}</td>
                      {tables[tableName].headers.map((header) => {
                        return <td>{profile[header]}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          );
        })}
      </>
    );
  };
