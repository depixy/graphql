import { default as gql } from "graphql-tag";
import { getAuth, wrapError } from "./prisma-util.js";

import type { IResolvers } from "mercurius";

export const typeDefs = gql`
  type User {
    id: ID!
    loginName: String!
    displayName: String!
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    posts: [Post!]!
    roles: [Role!]!
  }

  input UserWhereUniqueInput {
    id: String
    loginName: String
    displayName: String
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

  input UserWhereInput {
    AND: [UserWhereInput!]
    OR: [UserWhereInput!]
    NOT: [UserWhereInput!]
    id: IDFilter
    displayName: StringFilter
    loginName: StringFilter
    email: StringFilter
    createdAt: DateTimeFilter
    updatedAt: DateTimeFilter
  }

  input UserOrderBy {
    id: Order
    name: Order
    userCount: Order
    createdAt: Order
    updatedAt: Order
  }

  extend type Query {
    me: User
    user(input: UserWhereUniqueInput!): User
    users(pagination: Pagination!): Users!
  }

  input UserCreateInput {
    loginName: String!
    displayName: String!
    email: String!
    password: String!
  }

  input UserUpdateInput {
    id: ID!
    loginName: String
    displayName: String
    email: String
    password: String
  }

  input LoginInput {
    loginName: String!
    password: String!
  }

  extend type Mutation {
    login(input: LoginInput!): User
    logout: Void
    createUser(input: UserCreateInput!): User!
    updateUser(input: UserUpdateInput!): User!
    removeUsers(input: UserWhereInput!): BatchPayload!
  }
`;

export const resolvers: IResolvers = {
  Query: {
    me: async (_parent, args, ctx) => getAuth(ctx)?.user,
    user: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = adapters.user.whereUnique(input);
      return await db.user.findUnique({ where }).catch(wrapError);
    },
    users: async (_parent, args) => {
      const { pagination } = args;
      const { skip, take } = pagination;
      return {
        pageInfo: {
          skip,
          take
        }
      };
    }
  },
  Users: {
    count: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = input ? adapters.user.where(input) : {};
      return await db.user.count({ where }).catch(wrapError);
    },
    edges: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { pagination, input, orderBy: orderByInput } = args;
      const { skip, take } = pagination;
      const where = input ? adapters.user.where(input) : {};
      const orderBy = orderByInput ? adapters.user.orderBy(orderByInput) : {};
      return await db.user
        .findMany({ skip, take, where, orderBy })
        .catch(wrapError);
    }
  },
  User: {
    posts: async (parent, _args, ctx) => {
      const { db } = ctx.app;
      return await db.user
        .findUnique({ where: { id: parent.id } })
        .posts()
        .catch(wrapError);
    },
    roles: async (parent, _args, ctx) => {
      const { db } = ctx.app;
      return await db.user
        .findUnique({ where: { id: parent.id } })
        .roles()
        .catch(wrapError);
    }
  },
  Mutation: {
    login: async (_parent, args, ctx) => {
      const { db } = ctx.app;
      const { input } = args;
      const { password, loginName } = input;
      const user = await db.user.findUnique({ where: { loginName } });
      if (!user) {
        return null;
      }
      const matchPassword = await ctx.app.password.compare(
        password,
        user.hashedPassword
      );
      if (!matchPassword) {
        return null;
      }
      ctx.reply.setJwtCookie(user);
      return user;
    },
    logout: async (_parent, args, ctx) => {
      ctx.reply.clearJwtCookie();
      return null;
    },
    createUser: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const { password, ...others } = input;
      const hashedPassword = await ctx.app.password.hash(password);
      const data = adapters.user.create({
        ...others,
        password: hashedPassword
      });
      return await db.user.create({ data }).catch(wrapError);
    },
    updateUser: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const { password, ...others } = input;
      const hashedPassword = password
        ? await ctx.app.password.hash(password)
        : undefined;
      const data = adapters.user.update({
        ...others,
        password: hashedPassword
      });
      return await db.user
        .update({ data, where: { id: input.id } })
        .catch(wrapError);
    },
    removeUsers: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = adapters.user.where(input);
      return await db.user.deleteMany({ where }).catch(wrapError);
    }
  }
};
