import * as React from "react";
import { useState } from "react";
import { Roster } from "../../services/types";
import "../../assets/scss/RosterNavigator.scss";
import { RosterForceNavigator } from "./RosterForceNavigator";

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
            {props.roster.forces
              .filter((force) => force.selections.some((sel) => sel.alive))
              .map((force) => (
                <RosterForceNavigator
                  key={`router-navigator-selection-${force.id}`}
                  force={force}
                />
              ))}
          </ul>
        )}
      </div>
    );
  };
