import { default as gql } from "graphql-tag";
import { mapPagination } from "@depixy/graphql/schema/util";

import type { Resolvers } from "@depixy/graphql/schema/type";

export const typeDefs = gql`
  extend type Query {
    post(input: PostWhereUniqueInput!): Post
    posts(pagination: Pagination!): Posts!
  }
`;

export const resolvers: Resolvers = {
  Query: {
    post: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = adapters.post.whereUnique(input);
      return db.post.findUnique({ where });
    },
    posts: async (_parent, args) => mapPagination(args)
  }
};
