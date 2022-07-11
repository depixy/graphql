import { default as gql } from "graphql-tag";
import { mapPagination } from "@depixy/graphql/schema/util";

import type { Resolvers } from "@depixy/graphql/schema/type";

export const typeDefs = gql`
  extend type Query {
    me: DetailUser
    user(input: UserWhereUniqueInput!): User
    users(pagination: Pagination!): Users!
  }
`;

export const resolvers: Resolvers = {
  Query: {
    me: async (_parent, args, ctx) => ctx.auth?.user,
    user: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = adapters.user.whereUnique(input);
      return await db.user.findUnique({ where });
    },
    users: async (_parent, args) => mapPagination(args)
  }
};
