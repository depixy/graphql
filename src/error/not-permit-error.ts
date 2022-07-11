import { default as mercurius } from "mercurius";

export class NotPermitError extends mercurius.ErrorWithProps {
  constructor() {
    super("Not enough permission", { code: "NOT_PERMIT" }, 403);
  }
}
