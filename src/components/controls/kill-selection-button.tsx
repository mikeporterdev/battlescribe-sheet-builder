import * as React from "react";
import { useRoster } from "../contexts/roster-context";
import { Roster } from "../../services/types";

interface KillSelectionButtonProps {
  selectionId: string;
}

const findSelectionForRoster = (roster: Roster, selectionId: string) => {
  return roster.forces
    .flatMap((force) => force.selections)
    .find((id) => selectionId === id.id);
};

export const KillSelectionButton: React.FC<KillSelectionButtonProps> = (
  props,
) => {
  const { roster, setRoster } = useRoster();

  const clickHandler = async (e) => {
    findSelectionForRoster(roster, props.selectionId).alive = false;
    setRoster({ ...roster });
  };

  return <button onClick={clickHandler}>kill</button>;
};
