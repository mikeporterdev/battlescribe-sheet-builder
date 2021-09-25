import * as React from "react";
import { Force } from "../../services/types";
import { HashLink } from "react-router-hash-link";
import { sortSelectionUnitCategories } from "../../utils/sort-unit-categories";

interface RosterForceNavigatorProps {
  force: Force;
}

export const RosterForceNavigator: React.FC<RosterForceNavigatorProps> = ({
  force,
}) => {
  return (
    <li>
      {force.name}
      <ul>
        {force.selections
          .filter((sel) => sel.alive)
          .sort(sortSelectionUnitCategories)
          .map((selection) => (
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
  );
};
