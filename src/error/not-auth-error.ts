import { default as mercurius } from "mercurius";

export class NotAuthError extends mercurius.ErrorWithProps {
  constructor() {
    super("Not authorized", { code: "NOT_AUTH" }, 403);
  }
}
