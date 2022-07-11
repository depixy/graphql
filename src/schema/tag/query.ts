import { default as gql } from "graphql-tag";
import { mapPagination } from "@depixy/graphql/schema/util";

import type { Resolvers } from "@depixy/graphql/schema/type";

export const typeDefs = gql`
  extend type Query {
    tag(input: TagWhereUniqueInput!): Tag
    tags(pagination: Pagination!): Tags!
  }
`;

export const resolvers: Resolvers = {
  Query: {
    tag: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = adapters.tag.whereUnique(input);
      return db.tag.findUnique({ where });
    },
    tags: async (_parent, args) => mapPagination(args)
  }
};
