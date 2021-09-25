import * as React from "react";
import { TransportProfile } from "../../services/types";

interface TransportTableComponentProps {
  transportProfiles: TransportProfile[];
}

export const TransportTableComponent: React.FC<TransportTableComponentProps> =
  ({ transportProfiles }) => {
    if (!transportProfiles.length) return null;

    return (
      <table>
        <thead>
          <tr>
            <th>Transport</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {transportProfiles.map((profile) => (
            <tr key={profile.id + "-transport-table-row"}>
              <td>{profile.name}</td>
              <td>{profile.capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
