import * as React from "react";
import { useRoster } from "../contexts/roster-context";
import { Roster } from "../../services/types";
import "../../assets/scss/Controls.scss";
import { Button } from "react-bootstrap";

interface KillSelectionButtonProps {
  selectionId: string;
}

const findSelectionForRoster = (roster: Roster, selectionId: string) => {
  return roster.forces
    .flatMap((force) => force.selections)
    .find((id) => selectionId === id.id);
};

export const KillSelectionButtonComponent: React.FC<KillSelectionButtonProps> =
  (props) => {
    const { roster, setRoster } = useRoster();

    const selection = findSelectionForRoster(roster, props.selectionId);
    const clickHandler = async () => {
      selection.alive = !selection.alive;
      setRoster({ ...roster });
      localStorage.setItem("roster", JSON.stringify({ ...roster }));
    };

    return (
      <Button
        variant={selection.alive ? "danger" : "primary"}
        className={"kill-button-container"}
        onClick={clickHandler}
      >
        {selection.alive ? "Kill" : "Revive"}
      </Button>
    );
  };
