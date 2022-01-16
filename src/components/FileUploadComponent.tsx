import * as React from "react";
import { useRoster } from "./contexts/roster-context";
import { Parser } from "../services/Parser";

export const FileUploadComponent: React.FC = () => {
  const { setRoster } = useRoster();

  const changeHandler = async (e) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const parse = await new Parser().parse(text as ArrayBuffer);
      setRoster(parse);
      localStorage.setItem("roster", JSON.stringify(parse));
    };
    reader.readAsArrayBuffer(e.target.files[0]);
  };

  const storedRoster = localStorage.getItem("roster");
  if (storedRoster) setRoster(JSON.parse(storedRoster));

  return <input type={"file"} name={"file"} onChange={changeHandler} />;
};
