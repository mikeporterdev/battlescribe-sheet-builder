import AbstractRosterLoader from "./AbstractRosterLoader";
import { BSRoster } from "../types";

export default class RawBufferLoader extends AbstractRosterLoader {
  buffer: ArrayBuffer;
  constructor(buffer: ArrayBuffer) {
    super();
    this.buffer = buffer;
  }

  async load(): Promise<BSRoster> {
    return this.parseString(this.buffer);
  }
}
