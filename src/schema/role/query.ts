import { default as gql } from "graphql-tag";
import { mapPagination } from "@depixy/graphql/schema/util";

import type { Resolvers } from "@depixy/graphql/schema/type";

export const typeDefs = gql`
  extend type Query {
    role(input: RoleWhereUniqueInput!): Role
    roles(pagination: Pagination!): Roles!
  }
`;

export const resolvers: Resolvers = {
  Query: {
    role: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = adapters.role.whereUnique(input);
      return db.role.findUnique({ where });
    },
    roles: async (_parent, args) => mapPagination(args)
  }
};
