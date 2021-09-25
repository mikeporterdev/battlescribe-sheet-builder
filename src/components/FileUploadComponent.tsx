import * as React from "react";
import { useRoster } from "./contexts/roster-context";
import { Parser } from "../services/Parser";

interface FileUploadComponentProps {}

export const FileUploadComponent: React.FC<FileUploadComponentProps> = (
  props,
) => {
  const { setRoster } = useRoster();

  const changeHandler = async (e) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      console.log(text);
      const parse = await new Parser().parse(text as ArrayBuffer);
      setRoster(parse);
    };
    reader.readAsArrayBuffer(e.target.files[0]);

    // setRoster(e.target.files[0]);
  };

  return <input type={"file"} name={"file"} onChange={changeHandler} />;
};
