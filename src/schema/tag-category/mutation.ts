import { default as gql } from "graphql-tag";

import type { Resolvers } from "@depixy/graphql/schema/type";

export const typeDefs = gql`
  extend type Mutation {
    createTagCategory(input: TagCategoryCreateInput!): TagCategory!
    updateTagCategory(input: TagCategoryUpdateInput!): TagCategory!
    removeTagCategories(input: TagCategoryWhereInput!): BatchPayload!
  }
`;

export const resolvers: Resolvers = {
  Mutation: {
    createTagCategory: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const data = adapters.tagCategory.create(input);
      return await db.tagCategory.create({ data });
    },
    updateTagCategory: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const data = adapters.tagCategory.update(input);
      return await db.tagCategory.update({ data, where: { id: input.id } });
    },
    removeTagCategories: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = adapters.tagCategory.where(input);
      return await db.tagCategory.deleteMany({ where });
    }
  }
};
