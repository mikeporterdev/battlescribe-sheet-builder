import * as React from "react";
import { ExplosionProfile } from "../services/types";

interface ExplodesTableProps {
  explodesProfiles: ExplosionProfile[];
}

export const ExplodesTable: React.FC<ExplodesTableProps> = ({
  explodesProfiles,
}) => {
  return (
    <>
      {!!explodesProfiles.length && (
        <table>
          <thead>
            <tr>
              <th>Explosion</th>
              <th>Dice Roll</th>
              <th>Distance</th>
              <th>Mortal Wounds</th>
            </tr>
          </thead>
          <tbody>
            {explodesProfiles.map((explosion) => (
              <tr key={explosion.id + "-explosion-table-row"}>
                <td>{explosion.name}</td>
                <td>{explosion.diceRoll}</td>
                <td>{explosion.distance}</td>
                <td>{explosion.mortalWounds}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
