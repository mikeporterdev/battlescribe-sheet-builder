import * as React from "react";
import { PsykerProfile } from "../services/types";

interface PsykerTableComponentProps {
  profiles: PsykerProfile[];
}

export const PsykerTableComponent: React.FC<PsykerTableComponentProps> = ({
  profiles,
}) => {
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
            {profiles.map((psychicPower) => (
              <tr key={psychicPower.id + "-psychic-power-table-row"}>
                <td>{psychicPower.name}</td>
                <td>{psychicPower.cast}</td>
                <td>{psychicPower.deny}</td>
                <td>{psychicPower.powersKnown}</td>
                <td>{psychicPower.other}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
