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

    const clickHandler = async (e) => {
      findSelectionForRoster(roster, props.selectionId).alive = false;
      setRoster({ ...roster });
    };

    return (
      <Button
        variant={"danger"}
        className={"kill-button-container"}
        onClick={clickHandler}
      >
        Kill
      </Button>
    );
  };
