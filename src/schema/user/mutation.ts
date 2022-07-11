import { default as gql } from "graphql-tag";
import { DateTime } from "luxon";
import { assertUser } from "@depixy/graphql/schema/util";

import type { Resolvers } from "@depixy/graphql/schema/type";

export const typeDefs = gql`
  extend type Mutation {
    login(input: LoginInput!): DetailUser
    logout: Void
    createUser(input: UserCreateInput!): DetailUser!
    updateMe(input: MeUpdateInput!): DetailUser!
    updateUser(input: UserUpdateInput!): DetailUser!
    removeUsers(input: UserWhereInput!): BatchPayload!
  }
`;

export const resolvers: Resolvers = {
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
      const expiredOn = DateTime.now().plus({ days: 30 }).toJSDate();
      const userToken = await db.userToken.create({
        data: {
          userId: user.id,
          description: "login",
          expiredOn
        }
      });
      ctx.reply.setJwtCookie(userToken);
      return user;
    },
    logout: async (_parent, args, ctx) => {
      const { db } = ctx.app;
      const jwt = ctx.reply.request.getJwtCookie();
      ctx.reply.clearJwtCookie();
      if (jwt) {
        try {
          const { userToken } = ctx.app.jwt.parse(jwt);
          await db.userToken.delete({ where: { id: userToken } });
        } catch (e) {
          // no-op
        }
      }
      return null;
    },
    createUser: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const { password, ...others } = input;
      const userCount = await db.user.count();
      const hashedPassword = await ctx.app.password.hash(password);
      const data = adapters.user.create({
        ...others,
        password: hashedPassword
      });
      const roles =
        userCount > 0
          ? { connect: { name: "user" } }
          : { connect: [{ name: "admin" }, { name: "user" }] };
      return await db.user.create({ data: { ...data, roles } });
    },
    updateMe: async (_parent, args, ctx) => {
      const id = assertUser(ctx).id;
      const { db, adapters } = ctx.app;
      const { input } = args;
      const { password, ...others } = input;
      const hashedPassword = password
        ? await ctx.app.password.hash(password)
        : undefined;
      const data = adapters.user.updateMe({
        ...others,
        password: hashedPassword
      });
      return await db.user.update({ data, where: { id } });
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
      return await db.user.update({ data, where: { id: input.id } });
    },
    removeUsers: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = adapters.user.where(input);
      const result = await db.user.deleteMany({ where });
      return result;
    }
  }
};
