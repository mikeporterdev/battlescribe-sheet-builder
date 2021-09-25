import * as React from "react";
import { Roster } from "../services/types";
import "./../assets/scss/Roster.scss";
import { ForceComponent } from "./ForceComponent";
import { CostsComponent } from "./CostsComponent";

type RosterComponentProps = { roster: Roster };
export const RosterComponent: React.FC<RosterComponentProps> = ({ roster }) => {
  return (
    <div className={"roster-container"}>
      <h1 className={"roster-header"}>
        {roster.name} <CostsComponent costs={roster.costs} />
      </h1>
      {roster.forces.map((force) => (
        <ForceComponent key={force.name} force={force} />
      ))}
    </div>
  );
};
