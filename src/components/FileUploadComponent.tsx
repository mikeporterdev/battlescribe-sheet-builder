import * as React from "react";
import { useRoster } from "./contexts/roster-context";
import { Parser } from "../services/Parser";
import { useEffect } from "react";
import { readBattlescribe } from "../services/parse-battlescribe-list";

export const FileUploadComponent: React.FC = () => {
  const { setRoster } = useRoster();

  const changeHandler = async (e) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const parse = await new Parser().parse(text as ArrayBuffer);
      console.log("ROSTER", parse);
      setRoster(parse);
    };
    reader.readAsArrayBuffer(e.target.files[0]);

    // setRoster(e.target.files[0]);
  };
  if (process.env.env === "local") {
    useEffect(() => {
      const readScribe = async () => {
        setRoster(await readBattlescribe());
      };
      readScribe();
    }, [readBattlescribe, setRoster]);
  }

  return <input type={"file"} name={"file"} onChange={changeHandler} />;
};
