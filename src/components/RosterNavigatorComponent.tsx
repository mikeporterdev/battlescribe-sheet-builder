import * as React from "react";
import { Roster } from "../services/types";
import "../assets/scss/RosterNavigator.scss";
import { HashLink } from "react-router-hash-link";

interface RosterNavigatorComponentProps {
  roster: Roster;
}

export const RosterNavigatorComponent: React.FC<RosterNavigatorComponentProps> =
  (props) => {
    return (
      <div className={"roster-navigator"}>
        <h5>ROSTER NAVIGATOR</h5>
        <ul>
          {props.roster.forces.map((force) => (
            <li key={`router-navigator-selection-${force.id}`}>
              {force.name}
              <ul>
                {force.selections.map((selection) => (
                  <li key={`router-navigator-selection-${selection.id}`}>
                    <HashLink
                      key={`navigator-link-${selection.id}`}
                      smooth
                      to={"/#" + selection.id}
                    >
                      {selection.name}
                    </HashLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  };
