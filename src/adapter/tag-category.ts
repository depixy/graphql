import filter from "./filter.js";
import tag from "./tag.js";

import type { Prisma } from "@prisma/client";
import type {
  TagCategoryCreateInput,
  TagCategoryOrderBy,
  TagCategoryUpdateInput,
  TagCategoryWhereInput,
  TagCategoryWhereUniqueInput
} from "../graphql.generated.js";

const create = (
  input: TagCategoryCreateInput
): Prisma.TagCategoryCreateArgs["data"] => {
  const { name, slug } = input;
  return {
    name,
    slug
  };
};

const where = (input: TagCategoryWhereInput): Prisma.TagCategoryWhereInput => {
  const { id, slug, name, tags, createdAt, updatedAt, AND, OR, NOT } = input;
  return {
    AND: AND ? AND.map(where) : undefined,
    OR: OR ? OR.map(where) : undefined,
    NOT: NOT ? NOT.map(where) : undefined,
    id: id ? filter.id(id) : undefined,
    slug: slug ? filter.string(slug) : undefined,
    name: name ? filter.string(name) : undefined,
    tags: tags ? tag.list(tags) : undefined,
    createdAt: createdAt ? filter.dateTime(createdAt) : undefined,
    updatedAt: updatedAt ? filter.dateTime(updatedAt) : undefined
  };
};

const whereUnique = (
  input: TagCategoryWhereUniqueInput
): Prisma.TagCategoryWhereUniqueInput => {
  const { id, slug, name } = input;
  return {
    id: id ?? undefined,
    slug: slug ?? undefined,
    name: name ?? undefined
  };
};

const orderBy = (
  inputs: TagCategoryOrderBy[]
): Prisma.TagCategoryOrderByWithRelationInput[] =>
  inputs.map(input => {
    const { id, slug, name, tagCount, createdAt, updatedAt } = input;
    return {
      id: id ?? undefined,
      slug: slug ?? undefined,
      name: name ?? undefined,
      tags: tagCount ? { _count: tagCount } : undefined,
      createdAt: createdAt ?? undefined,
      updatedAt: updatedAt ?? undefined
    };
  });

const update = (
  input: TagCategoryUpdateInput
): Prisma.TagCategoryUpdateArgs["data"] => {
  const { name, slug } = input;
  return {
    name: name ?? undefined,
    slug: slug ?? undefined,
    updatedAt: new Date()
  };
};

const adapters = { create, where, whereUnique, orderBy, update };
export default adapters;
