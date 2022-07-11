import { default as mercurius } from "mercurius";
import { Prisma } from "@prisma/client";
import { PrismaError } from "./prisma-error.js";

import type { ExecutionResult } from "graphql";
import type { MercuriusContext } from "mercurius";

interface FormattedError {
  statusCode: number;
  response: ExecutionResult;
}

export function formatError(
  execution: ExecutionResult,
  ctx: MercuriusContext
): FormattedError {
  const err =
    execution instanceof Prisma.PrismaClientKnownRequestError
      ? new PrismaError(execution)
      : execution;
  const response = mercurius.defaultErrorFormatter(err, ctx);
  return response;
}
