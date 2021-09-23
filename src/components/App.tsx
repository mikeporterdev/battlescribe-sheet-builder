import * as React from "react";
import { hot } from "react-hot-loader";
const reactLogo = require("./../assets/img/react_logo.svg");
import "./../assets/scss/App.scss";
import { Buffer } from "buffer";
import { useEffect } from "react";
import { readBattlescribe } from "../services/parse-battlescribe-list";

const App = () => {
  useEffect(() => {
    const readScribe = async () => {
      await readBattlescribe();
    };
    readScribe();
  });

  return (
    <div className="app">
      <h1>Hello World!</h1>
      <p>Foo to the bar {Buffer.name}z</p>

      <img src={reactLogo.default} height="480" />
    </div>
  );
};
declare let module: Record<string, unknown>;

export default hot(module)(App);
