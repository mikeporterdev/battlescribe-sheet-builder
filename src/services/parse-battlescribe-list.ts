// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import file from "../testfiles/JoshIrlGame.rosz";
import { Parser } from "./Parser";
import { Roster } from "./types";

export async function readBattlescribe(): Promise<Roster> {
  return await new Parser().parse(file);
}
