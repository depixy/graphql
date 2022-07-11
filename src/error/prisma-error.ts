import { default as mercurius } from "mercurius";

import type { Prisma } from "@prisma/client";

export class PrismaError extends mercurius.ErrorWithProps {
  constructor(e: Prisma.PrismaClientKnownRequestError) {
    super(e.message, { code: "PRISMA", prismaCode: e.code }, 400);
  }
}
