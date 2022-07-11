import { default as gql } from "graphql-tag";
import { mapPagination } from "@depixy/graphql/schema/util";

import type { Resolvers } from "@depixy/graphql/schema/type";

export const typeDefs = gql`
  extend type Query {
    tagCategory(input: TagCategoryWhereUniqueInput!): TagCategory
    tagCategories(pagination: Pagination!): TagCategories!
  }
`;

export const resolvers: Resolvers = {
  Query: {
    tagCategory: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = adapters.tagCategory.whereUnique(input);
      return await db.tagCategory.findUnique({ where });
    },
    tagCategories: async (_parent, args) => mapPagination(args)
  }
};
