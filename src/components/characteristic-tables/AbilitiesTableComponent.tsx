import * as React from "react";
import { AbilityProfile } from "../../services/types";
import { ScanCategoryTextComponent } from "../ScanCategoryTextComponent";

interface AbilitiesTableComponentProps {
  profiles: AbilityProfile[];
}

export const AbilitiesTableComponent: React.FC<AbilitiesTableComponentProps> =
  ({ profiles }) => {
    return (
      <>
        {!!profiles.length && (
          <table>
            <thead>
              <th>Abilities</th>
              <th>Description</th>
            </thead>
            <tbody>
              {profiles.map((ability) => {
                return (
                  <tr key={"ability" + ability.id}>
                    <td>{ability.name}</td>
                    <td>
                      <ScanCategoryTextComponent text={ability.description} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </>
    );
  };
