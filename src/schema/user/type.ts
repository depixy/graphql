import { default as gql } from "graphql-tag";

import type { Resolvers } from "@depixy/graphql/schema/type";

export const typeDefs = gql`
  type DetailUser {
    id: ID!
    loginName: String!
    displayName: String!
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    posts: [Post!]!
    roles: [Role!]!
  }

  type User {
    id: ID!
    loginName: String!
    displayName: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    posts: [Post!]!
    roles: [Role!]!
  }

  type Users {
    count(input: UserWhereInput): Int!
    edges(
      input: UserWhereInput
      pagination: Pagination!
      orderBy: [UserOrderBy!]
    ): [User!]!
    pageInfo: PageInfo!
  }
`;

export const resolvers: Resolvers = {
  User: {
    posts: async (parent, _args, ctx) => {
      const { db } = ctx.app;
      return await db.user.findUnique({ where: { id: parent.id } }).posts();
    },
    roles: async (parent, _args, ctx) => {
      const { db } = ctx.app;
      return await db.user.findUnique({ where: { id: parent.id } }).roles();
    }
  },
  DetailUser: {
    posts: async (parent, _args, ctx) => {
      const { db } = ctx.app;
      return await db.user.findUnique({ where: { id: parent.id } }).posts();
    },
    roles: async (parent, _args, ctx) => {
      const { db } = ctx.app;
      return await db.user.findUnique({ where: { id: parent.id } }).roles();
    }
  },
  Users: {
    count: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = input ? adapters.user.where(input) : {};
      return await db.user.count({ where });
    },
    edges: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { pagination, input, orderBy: orderByInput } = args;
      const { skip, take } = pagination;
      const where = input ? adapters.user.where(input) : {};
      const orderBy = orderByInput ? adapters.user.orderBy(orderByInput) : {};
      return await db.user.findMany({ skip, take, where, orderBy });
    }
  }
};
