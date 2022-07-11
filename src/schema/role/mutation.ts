import { default as gql } from "graphql-tag";

import type { Resolvers } from "@depixy/graphql/schema/type";

export const typeDefs = gql`
  extend type Mutation {
    createRole(input: RoleCreateInput!): Role!
    updateRole(input: RoleUpdateInput!): Role!
    removeRoles(input: RoleWhereInput!): BatchPayload!
  }
`;

export const resolvers: Resolvers = {
  Mutation: {
    createRole: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const data = adapters.role.create(input);
      return await db.role.create({ data });
    },
    updateRole: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const data = adapters.role.update(input);
      return await db.role.update({ data, where: { id: input.id } });
    },
    removeRoles: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = adapters.role.where(input);
      return await db.role.deleteMany({ where });
    }
  }
};
