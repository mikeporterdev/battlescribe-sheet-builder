import { createContext, useContext, useReducer } from "react";
import { Roster } from "../../services/types";

export type RosterContextType = {
  roster?: Roster;
  setRoster: (showRoster: Roster) => void;
};

export const RosterContext = createContext<RosterContextType>({
  roster: undefined,
  setRoster: (showRoster) => console.log("Couldn't set roster"),
});

export const useRoster = () => useContext(RosterContext);
