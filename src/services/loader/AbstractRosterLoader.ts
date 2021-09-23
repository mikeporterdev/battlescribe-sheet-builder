import { BSRoster } from "../types";
import RosterLoader from "./RosterLoader";
// import XMLParser from "react-xml-parser";
import { parseString } from "xml2js";
import * as JSZip from "jszip";

export default abstract class AbstractRosterLoader implements RosterLoader {
  abstract load(): Promise<BSRoster>;

  protected async parseString(data: ArrayBuffer): Promise<BSRoster> {
    const jsZip = new JSZip();
    const jsZipOutput = await jsZip.loadAsync(data);
    const string = await Object.values(jsZipOutput.files)[0].async("string");
    return new Promise((resolve, reject) => {
      parseString(string, (err: Error, result) => {
        if (err) return reject(err);
        if (!result) return reject(new Error("Failed to parse entry"));
        return resolve(result.roster);
      });
    });
  }
}
