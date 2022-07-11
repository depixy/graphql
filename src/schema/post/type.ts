import { default as gql } from "graphql-tag";
import { notNull } from "@depixy/graphql/schema/util";

import type { Resolvers } from "@depixy/graphql/schema/type";

export const typeDefs = gql`
  type Post {
    id: ID!
    slug: String!
    name: String!
    tags: [Tag!]!
    images: [Image!]!
    description: String!
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Posts {
    count(input: PostWhereInput): Int!
    edges(
      input: PostWhereInput
      pagination: Pagination!
      orderBy: [PostOrderBy!]
    ): [Post!]!
    pageInfo: PageInfo!
  }
`;

export const resolvers: Resolvers = {
  Posts: {
    count: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = input ? adapters.post.where(input) : {};
      return await db.post.count({ where });
    },
    edges: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { pagination, input, orderBy: orderByInput } = args;
      const { skip, take } = pagination;
      const where = input ? adapters.post.where(input) : {};
      const orderBy = orderByInput ? adapters.post.orderBy(orderByInput) : {};
      return await db.post.findMany({ skip, take, where, orderBy });
    }
  },
  Post: {
    images: async (parent, _args, ctx) => {
      const { db } = ctx.app;
      return await db.post.findUnique({ where: { id: parent.id } }).images();
    },
    tags: async (parent, _args, ctx) => {
      const { db } = ctx.app;
      return await db.post.findUnique({ where: { id: parent.id } }).tags();
    },
    user: async (parent, _args, ctx) => {
      const { db } = ctx.app;
      return await db.post
        .findUnique({ where: { id: parent.id } })
        .user()
        .then(notNull);
    }
  }
};
