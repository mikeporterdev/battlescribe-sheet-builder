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
      <h3>Force Rules</h3>
      <ul>
        {roster.forces
          .flatMap((force) => {
            return force.rules;
          })
          .filter((val, id, array) => {
            return array.map((i) => i.name).indexOf(val.name) == id;
          })
          .map((rule) => (
            <li>
              <b>{rule.name}: </b>
              <span>{rule.description}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};
