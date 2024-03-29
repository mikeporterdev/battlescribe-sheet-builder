import * as React from "react";
import { PsychicPowerProfile } from "../../services/types";
import { ScanCategoryTextComponent } from "../ScanCategoryTextComponent";

interface PsychicPowerTableComponentProps {
  profiles: PsychicPowerProfile[];
}

export const PsychicPowerTableComponent: React.FC<PsychicPowerTableComponentProps> =
  ({ profiles }) => {
    return (
      <>
        {!!profiles.length && (
          <table>
            <thead>
              <tr>
                <th>Psychic Power</th>
                <th>Warp Charge</th>
                <th>Range</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((psychicPower) => (
                <tr key={psychicPower.id + "-psychic-power-table-row"}>
                  <td>{psychicPower.name}</td>
                  <td>{psychicPower.warpCharge}</td>
                  <td>{psychicPower.range}</td>
                  <ScanCategoryTextComponent text={psychicPower.details} />
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    );
  };
