import type { Prisma } from "@prisma/client";
import type {
  DateTimeFilter,
  IDFilter,
  StringFilter
} from "../graphql.generated.js";

const id = (input: IDFilter): Prisma.StringFilter => {
  const { equal, notIn, not } = input;
  return {
    equals: equal ?? undefined,
    in: input.in ?? undefined,
    not: not ? id(not) : undefined,
    notIn: notIn ?? undefined
  };
};

const string = (input: StringFilter): Prisma.StringFilter => {
  const { contain, endWith, equal, notIn, not, startWith } = input;
  return {
    contains: contain ?? undefined,
    endsWith: endWith ?? undefined,
    equals: equal ?? undefined,
    in: input.in ?? undefined,
    not: not ? string(not) : undefined,
    notIn: notIn ?? undefined,
    startsWith: startWith ?? undefined
  };
};

const dateTime = (input: DateTimeFilter): Prisma.DateTimeFilter => {
  const { equal, notIn, not, gt, gte, lt, lte } = input;
  return {
    equals: equal ?? undefined,
    gt: gt ?? undefined,
    gte: gte ?? undefined,
    in: input.in ?? undefined,
    not: not ? dateTime(not) : undefined,
    notIn: notIn ?? undefined,
    lt: lt ?? undefined,
    lte: lte ?? undefined
  };
};

const adapters = { id, string, dateTime };
export default adapters;
