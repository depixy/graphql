import { default as gql } from "graphql-tag";

import type { Resolvers } from "@depixy/graphql/schema/type";

export const typeDefs = gql`
  type TagCategory {
    id: ID!
    slug: String!
    name: String!
    tags: [Tag!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type TagCategories {
    count(input: TagCategoryWhereInput): Int!
    edges(
      input: TagCategoryWhereInput
      pagination: Pagination!
      orderBy: [TagCategoryOrderBy!]
    ): [TagCategory!]!
    pageInfo: PageInfo!
  }
`;

export const resolvers: Resolvers = {
  TagCategory: {
    tags: async (parent, _args, ctx) => {
      const { db } = ctx.app;
      return await db.tagCategory
        .findUnique({ where: { id: parent.id } })
        .tags();
    }
  },
  TagCategories: {
    count: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = input ? adapters.tagCategory.where(input) : {};
      return await db.tagCategory.count({ where });
    },
    edges: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { pagination, input, orderBy: orderByInput } = args;
      const { skip, take } = pagination;
      const where = input ? adapters.tagCategory.where(input) : {};
      const orderBy = orderByInput
        ? adapters.tagCategory.orderBy(orderByInput)
        : {};
      return await db.tagCategory.findMany({ skip, take, where, orderBy });
    }
  }
};
