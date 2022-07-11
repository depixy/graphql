import { default as mercurius } from "mercurius";

export class InvalidIdError extends mercurius.ErrorWithProps {
  constructor(id: string) {
    super("Invalid Id", { code: "NOT_AUTH", id }, 403);
  }
}
