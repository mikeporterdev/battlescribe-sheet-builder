import * as React from "react";
import { hot } from "react-hot-loader";
import "./../assets/scss/App.scss";
import { RosterComponent } from "./RosterComponent";
import { RosterNavigatorComponent } from "./navigator/RosterNavigatorComponent";
import { BrowserRouter } from "react-router-dom";
import { FileUploadComponent } from "./FileUploadComponent";
import { RosterContext } from "./contexts/roster-context";
import { useState } from "react";
import { Roster } from "../services/types";
import "bootstrap/dist/css/bootstrap.min.css";
import { NoRosterPageComponent } from "../NoRosterPageComponent";
const App = () => {
  const [roster, setRoster] = useState<Roster>(undefined);
  return (
    <BrowserRouter>
      <RosterContext.Provider value={{ roster, setRoster }}>
        {!roster && <NoRosterPageComponent />}
        <div className={"app-container"}>
          {roster && (
            <div style={{ width: "100%", textAlign: "center" }}>
              <a href={"#"} onClick={() => setRoster(undefined)}>
                Clear Sheet
              </a>
            </div>
          )}
          {roster && <RosterComponent roster={roster} />}
          {roster && <RosterNavigatorComponent roster={roster} />}
        </div>
      </RosterContext.Provider>
    </BrowserRouter>
  );
};
declare let module: Record<string, unknown>;

export default hot(module)(App);
