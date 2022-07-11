import filter from "./filter.js";
import _ from "lodash";

import type { Prisma } from "@prisma/client";
import type {
  RoleCreateInput,
  RoleOrderBy,
  RoleUpdateInput,
  RoleWhereInput,
  RoleWhereUniqueInput
} from "@depixy/graphql/schema/generated";

const create = (input: RoleCreateInput): Prisma.RoleCreateArgs["data"] => {
  const { name } = input;
  return { name, editable: true };
};

const where = (input: RoleWhereInput): Prisma.RoleWhereInput => {
  const { id, editable, name, createdAt, updatedAt } = input;
  return {
    id: id ? filter.id(id) : undefined,
    name: name ? filter.string(name) : undefined,
    editable: _.isNil(editable) ? undefined : filter.boolean(editable),
    createdAt: createdAt ? filter.dateTime(createdAt) : undefined,
    updatedAt: updatedAt ? filter.dateTime(updatedAt) : undefined
  };
};

const whereUnique = (
  input: RoleWhereUniqueInput
): Prisma.RoleWhereUniqueInput => {
  const { id } = input;
  return {
    id: id ?? undefined
  };
};

const orderBy = (
  inputs: RoleOrderBy[]
): Prisma.RoleOrderByWithRelationInput[] =>
  inputs.map(input => {
    const { id, editable, name, createdAt, updatedAt } = input;
    return {
      id: id ?? undefined,
      editable: _.isNil(editable) ? undefined : editable,
      name: name ?? undefined,
      createdAt: createdAt ?? undefined,
      updatedAt: updatedAt ?? undefined
    };
  });

const update = (input: RoleUpdateInput): Prisma.RoleUpdateArgs["data"] => {
  const { name } = input;
  return {
    name: name ?? undefined,
    updatedAt: new Date()
  };
};

const adapters = { create, where, whereUnique, orderBy, update };
export default adapters;
