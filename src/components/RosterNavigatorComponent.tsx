import * as React from "react";
import { Roster } from "../services/types";
import "../assets/scss/RosterNavigator.scss";
import { HashLink } from "react-router-hash-link";
import { useState } from "react";

interface RosterNavigatorComponentProps {
  roster: Roster;
}

export const RosterNavigatorComponent: React.FC<RosterNavigatorComponentProps> =
  (props) => {
    const [hover, setHover] = useState<boolean>(false);

    return (
      <div
        className={"roster-navigator"}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <h5 className={"roster-navigator-title"}>ROSTER NAVIGATOR</h5>
        {hover && (
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
                        to={"#" + selection.id}
                      >
                        {selection.name}
                      </HashLink>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
