import * as React from "react";
import { Selection } from "../services/types";

interface UnitNameComponentProps {
  selection: Selection;
}

export const UnitNameComponent: React.FC<UnitNameComponentProps> = ({
  selection,
}) => {
  return (
    <>
      <span
        style={{
          textDecoration: selection.alive ? "inherit" : "line-through",
        }}
      >
        {selection.name}
      </span>
      {!selection.alive && <span> (Dead)</span>}
    </>
  );
};
