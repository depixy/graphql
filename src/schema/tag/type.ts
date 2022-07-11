import { default as gql } from "graphql-tag";
import { notNull } from "@depixy/graphql/schema/util";

import type { Resolvers } from "@depixy/graphql/schema/type";

export const typeDefs = gql`
  type Tag {
    id: ID!
    slug: String!
    name: String!
    category: TagCategory!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Tags {
    count(input: TagWhereInput): Int!
    edges(
      input: TagWhereInput
      pagination: Pagination!
      orderBy: [TagOrderBy!]
    ): [Tag!]!
    pageInfo: PageInfo!
  }
`;

export const resolvers: Resolvers = {
  Tag: {
    category: async (parent, _args, ctx) => {
      const { db } = ctx.app;
      return await db.tag
        .findUnique({ where: { id: parent.id } })
        .category()
        .then(notNull);
    }
  },
  Tags: {
    count: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = input ? adapters.tag.where(input) : {};
      return await db.tag.count({ where });
    },
    edges: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { pagination, input, orderBy: orderByInput } = args;
      const { skip, take } = pagination;
      const where = input ? adapters.tag.where(input) : {};
      const orderBy = orderByInput ? adapters.tag.orderBy(orderByInput) : {};
      return await db.tag.findMany({ skip, take, where, orderBy });
    }
  }
};
