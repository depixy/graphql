import { default as gql } from "graphql-tag";

import type { Resolvers } from "@depixy/graphql/schema/type";

export const typeDefs = gql`
  extend type Mutation {
    createTag(input: TagCreateInput!): Tag!
    updateTag(input: TagUpdateInput!): Tag!
    removeTags(input: TagWhereInput!): BatchPayload!
  }
`;

export const resolvers: Resolvers = {
  Mutation: {
    createTag: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const data = adapters.tag.create(input);
      return await db.tag.create({ data });
    },
    updateTag: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const data = adapters.tag.update(input);
      return await db.tag.update({ data, where: { id: input.id } });
    },
    removeTags: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = adapters.tag.where(input);
      return await db.tag.deleteMany({ where });
    }
  }
};
