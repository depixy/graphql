import filter from "./filter.js";

import type { Prisma } from "@prisma/client";
import type {
  UserCreateInput,
  UserOrderBy,
  UserUpdateInput,
  UserWhereInput,
  UserWhereUniqueInput
} from "../graphql.generated.js";

const create = (input: UserCreateInput): Prisma.UserCreateArgs["data"] => {
  const { loginName, displayName, email, password } = input;
  return {
    displayName,
    loginName,
    email,
    hashedPassword: password
  };
};

const where = (input: UserWhereInput): Prisma.UserWhereInput => {
  const { id, displayName, loginName, createdAt, updatedAt, AND, OR, NOT } =
    input;
  return {
    AND: AND ? AND.map(where) : undefined,
    OR: OR ? OR.map(where) : undefined,
    NOT: NOT ? NOT.map(where) : undefined,
    id: id ? filter.id(id) : undefined,
    displayName: displayName ? filter.string(displayName) : undefined,
    loginName: loginName ? filter.string(loginName) : undefined,
    createdAt: createdAt ? filter.dateTime(createdAt) : undefined,
    updatedAt: updatedAt ? filter.dateTime(updatedAt) : undefined
  };
};

const whereUnique = (
  input: UserWhereUniqueInput
): Prisma.UserWhereUniqueInput => {
  const { id, loginName, displayName } = input;
  return {
    id: id ?? undefined,
    loginName: loginName ?? undefined,
    displayName: displayName ?? undefined
  };
};

const orderBy = (
  inputs: UserOrderBy[]
): Prisma.UserOrderByWithRelationInput[] =>
  inputs.map(input => {
    const { id, name, userCount, createdAt, updatedAt } = input;
    return {
      id: id ?? undefined,
      name: name ?? undefined,
      users: userCount ? { _count: userCount } : undefined,
      createdAt: createdAt ?? undefined,
      updatedAt: updatedAt ?? undefined
    };
  });

const update = (input: UserUpdateInput): Prisma.UserUpdateArgs["data"] => {
  const { id, loginName, displayName, email, password } = input;
  return {
    id: id ?? undefined,
    loginName: loginName ?? undefined,
    displayName: displayName ?? undefined,
    email: email ?? undefined,
    hashedPassword: password ?? undefined,
    updatedAt: new Date()
  };
};

const adapters = { create, whereUnique, where, orderBy, update };
export default adapters;
