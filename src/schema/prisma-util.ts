import { Prisma } from "@prisma/client";
import { default as mercurius } from "mercurius";
import { throwNullError, throwPrismaError } from "./error.js";

import type { MercuriusContext } from "mercurius";
import type { AuthContext } from "@depixy/auth";

export function getAuth(ctx: MercuriusContext): AuthContext | null {
  return ctx.reply.request.auth;
}

export function assertUser(ctx: MercuriusContext): AuthContext["user"] {
  const auth = getAuth(ctx);
  if (!auth) {
    throw new mercurius.ErrorWithProps("Not authorized", {}, 403);
  }
  return auth.user;
}

export function assertRole(
  ctx: MercuriusContext,
  role: "user" | "admin"
): AuthContext["user"] {
  const user = assertUser(ctx);

  if (user.role !== role) {
    throw new mercurius.ErrorWithProps("Not authorized", {}, 403);
  }
  return user;
}

export async function wrapError(e: unknown): Promise<never> {
  if (!(e instanceof Prisma.PrismaClientKnownRequestError)) {
    throw e;
  }
  throwPrismaError(e);
}

export async function notNull<T>(data?: T | null): Promise<T> {
  if (typeof data === "undefined" || data === null) {
    throwNullError();
  }
  return data;
}
