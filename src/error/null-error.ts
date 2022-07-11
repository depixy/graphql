import { default as mercurius } from "mercurius";

export class NullError extends mercurius.ErrorWithProps {
  constructor() {
    super("Expect not null", { code: "NULL_VALLUE" }, 500);
  }
}
