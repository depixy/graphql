import { NullError } from "@depixy/graphql/error";

export async function notNull<T>(data?: T | null): Promise<T> {
  if (typeof data === "undefined" || data === null) {
    throw new NullError();
  }
  return data;
}
