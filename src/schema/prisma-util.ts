import { Prisma } from "@prisma/client";
import { default as mercurius } from "mercurius";

import type { MercuriusContext } from "mercurius";
import type { AuthContext } from "@depixy/auth";

export const prismaUtil = {
  async wrapError(e: unknown) {
    if (!(e instanceof Prisma.PrismaClientKnownRequestError)) {
      throw e;
    }
    const extension = {
      type: "prisma",
      code: e.code
    };
    throw new mercurius.ErrorWithProps(e.message, extension, 400);
  },
  async notNull<T>(data: T | null) {
    if (data !== null) {
      return data;
    }
    const extension = {
      type: "prisma",
      code: -1
    };
    throw new mercurius.ErrorWithProps("Expect not null", extension, 500);
  }
};

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

export async function wrapError(e: unknown): Promise<never> {
  if (!(e instanceof Prisma.PrismaClientKnownRequestError)) {
    throw e;
  }
  const extension = {
    type: "prisma",
    code: e.code
  };
  throw new mercurius.ErrorWithProps(e.message, extension, 400);
}

export function notNull<T>(data: T | null): T {
  if (data !== null) {
    return data;
  }
  const extension = {
    type: "prisma",
    code: -1
  };
  throw new mercurius.ErrorWithProps("Expect not null", extension, 500);
}
