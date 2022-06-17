import filter from "./filter.js";

import type { Prisma } from "@prisma/client";
import type {
  TagCreateInput,
  TagListFilter,
  TagOrderBy,
  TagUpdateInput,
  TagWhereInput,
  TagWhereUniqueInput
} from "../graphql.generated.js";

const create = (input: TagCreateInput): Prisma.TagCreateArgs["data"] => {
  const { name, slug, categoryId } = input;
  return {
    name,
    slug,
    categoryId
  };
};

const where = (input: TagWhereInput): Prisma.TagWhereInput => {
  const { id, slug, name, createdAt, updatedAt, AND, OR, NOT } = input;
  return {
    AND: AND ? AND.map(where) : undefined,
    OR: OR ? OR.map(where) : undefined,
    NOT: NOT ? NOT.map(where) : undefined,
    id: id ? filter.id(id) : undefined,
    slug: slug ? filter.string(slug) : undefined,
    name: name ? filter.string(name) : undefined,
    createdAt: createdAt ? filter.dateTime(createdAt) : undefined,
    updatedAt: updatedAt ? filter.dateTime(updatedAt) : undefined
  };
};

const whereUnique = (
  input: TagWhereUniqueInput
): Prisma.TagWhereUniqueInput => {
  const { id, slug, name } = input;
  return {
    id: id ?? undefined,
    slug: slug ?? undefined,
    name: name ?? undefined
  };
};

const orderBy = (inputs: TagOrderBy[]): Prisma.TagOrderByWithRelationInput[] =>
  inputs.map(input => {
    const { id, slug, name, createdAt, updatedAt } = input;
    return {
      id: id ?? undefined,
      slug: slug ?? undefined,
      name: name ?? undefined,
      createdAt: createdAt ?? undefined,
      updatedAt: updatedAt ?? undefined
    };
  });

const update = (input: TagUpdateInput): Prisma.TagUpdateArgs["data"] => {
  const { name, slug } = input;
  return {
    name: name ?? undefined,
    slug: slug ?? undefined,
    updatedAt: new Date()
  };
};

const list = (input: TagListFilter): Prisma.TagListRelationFilter => {
  const { every, some, none } = input;
  return {
    every: every ? where(every) : undefined,
    some: some ? where(some) : undefined,
    none: none ? where(none) : undefined
  };
};

const adapters = { create, where, whereUnique, orderBy, update, list };
export default adapters;
