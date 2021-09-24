import * as React from "react";
import { useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import "./../assets/scss/App.scss";
import { readBattlescribe } from "../services/parse-battlescribe-list";
import { Roster } from "../services/types";
import { RosterComponent } from "./RosterComponent";

const App = () => {
  const [roster, setRoster] = useState<Roster | undefined>(undefined);

  useEffect(() => {
    const readScribe = async () => {
      if (!roster) {
        setRoster(await readBattlescribe());
      }
    };
    readScribe();
  }, [readBattlescribe, setRoster]);

  return <div>{roster && <RosterComponent roster={roster} />}</div>;
};
declare let module: Record<string, unknown>;

export default hot(module)(App);
