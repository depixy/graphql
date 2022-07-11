import { default as gql } from "graphql-tag";
import { assertUser } from "@depixy/graphql/schema/util";
import { InvalidIdError, NotPermitError } from "@depixy/graphql/error";
import _ from "lodash";

import type { Resolvers } from "@depixy/graphql/schema/type";

export const typeDefs = gql`
  extend type Mutation {
    createPost(input: PostCreateInput!): Post!
    updatePost(input: PostUpdateInput!): Post!
    removePosts(input: PostWhereInput!): BatchPayload!
  }
`;

export const resolvers: Resolvers = {
  Mutation: {
    createPost: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const user = assertUser(ctx);
      const data = adapters.post.create(input, user.id);
      return await db.post.create({ data });
    },
    updatePost: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const user = assertUser(ctx);
      const post = await db.post.findUnique({ where: { id: input.id } });
      const isAdmin = _.some(user.roles, { name: "admin" });
      if (!post) {
        throw new InvalidIdError(input.id);
      }
      if (post.userId !== user.id && !isAdmin) {
        throw new NotPermitError();
      }
      const data = adapters.post.update(input);
      return await db.post.update({ data, where: { id: input.id } });
    },
    removePosts: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const user = assertUser(ctx);
      const where = adapters.post.where(input);
      where.AND = {
        userId: user.id
      };
      return await db.post.deleteMany({ where });
    }
  }
};
