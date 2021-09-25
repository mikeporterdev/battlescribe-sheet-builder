// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import file from "../testfiles/DCBloodAngelsList.rosz";
import { Parser } from "./Parser";
import { Roster } from "./types";

export async function readBattlescribe(): Promise<Roster> {
  const roster = await new Parser().parse(file);
  return roster;
}
