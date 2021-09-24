import * as React from "react";
import { Roster } from "rosz2js";
import "./../assets/scss/Roster.scss";
import { ForceComponent } from "./ForceComponent";

type RosterComponentProps = { roster: Roster };
export const RosterComponent: React.FC<RosterComponentProps> = ({ roster }) => {
  return (
    <div>
      <h1 className={"roster-header"}>{roster.name}</h1>
      {roster.forces.map((force) => (
        <ForceComponent key={force.name} force={force} />
      ))}
    </div>
  );
};
