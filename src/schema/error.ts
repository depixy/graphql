import { Prisma } from "@prisma/client";
import { default as mercurius } from "mercurius";

export function throwPrismaError(
  e: Prisma.PrismaClientKnownRequestError
): never {
  const extension = {
    type: "prisma",
    code: "PRISMA_ERROR",
    prismaCode: e.code
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

export function throwCreateFirstUserError(): never {
  const extension = {
    code: "USER_EXIST"
  };
  throw new mercurius.ErrorWithProps(
    "createFirstUser cannot be called if there are other users",
    extension,
    400
  );
}
