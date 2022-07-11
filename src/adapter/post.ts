import filter from "./filter.js";

import type { Prisma } from "@prisma/client";
import type {
  PostCreateInput,
  PostOrderBy,
  PostUpdateInput,
  PostWhereInput,
  PostWhereUniqueInput
} from "@depixy/graphql/schema/generated";

const create = (
  input: PostCreateInput,
  userId: string
): Prisma.PostCreateArgs["data"] => {
  const { name, slug, description } = input;
  return {
    name,
    slug,
    description,
    userId
  };
};

const where = (input: PostWhereInput): Prisma.PostWhereInput => {
  const { id, slug, name, createdAt, updatedAt } = input;
  return {
    id: id ? filter.id(id) : undefined,
    slug: slug ? filter.string(slug) : undefined,
    name: name ? filter.string(name) : undefined,
    createdAt: createdAt ? filter.dateTime(createdAt) : undefined,
    updatedAt: updatedAt ? filter.dateTime(updatedAt) : undefined
  };
};

const whereUnique = (
  input: PostWhereUniqueInput
): Prisma.PostWhereUniqueInput => {
  const { id, slug } = input;
  return {
    id: id ?? undefined,
    slug: slug ?? undefined
  };
};

const orderBy = (
  inputs: PostOrderBy[]
): Prisma.PostOrderByWithRelationInput[] =>
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

const update = (input: PostUpdateInput): Prisma.PostUpdateArgs["data"] => {
  const { name, slug } = input;
  return {
    name: name ?? undefined,
    slug: slug ?? undefined,
    updatedAt: new Date()
  };
};

const adapters = { create, where, whereUnique, orderBy, update };
export default adapters;
