import { NotAuthError } from "@depixy/graphql/error";

import type { MercuriusContext } from "mercurius";
import type { AuthContext } from "@depixy/auth";

export function assertUser(
  ctx: MercuriusContext
): NonNullable<AuthContext["user"]> {
  const user = ctx.auth?.user;
  if (!user) {
    throw new NotAuthError();
  }
  return user;
}
