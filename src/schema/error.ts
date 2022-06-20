import { Prisma } from "@prisma/client";
import { default as mercurius } from "mercurius";

export function throwPrismaError(
  e: Prisma.PrismaClientKnownRequestError
): never {
  const extension = {
    type: "prisma",
    code: e.code
  };
  throw new mercurius.ErrorWithProps(e.message, extension, 400);
}

export function throwNullError(): never {
  const extension = {
    type: "prisma",
    code: "EXCEPT_NON_NULL"
  };
  throw new mercurius.ErrorWithProps("Expect not null", extension, 400);
}
