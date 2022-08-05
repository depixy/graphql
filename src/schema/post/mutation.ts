import { default as gql } from "graphql-tag";
import { assertUser } from "@depixy/graphql/schema/util";
import { InvalidIdError, NotPermitError } from "@depixy/graphql/error";
import _ from "lodash";
import imageType, { minimumBytes } from "image-type";

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
      const { db, adapters, tempStorage, uploadStorage } = ctx.app;
      const { input } = args;
      const user = assertUser(ctx);
      const data = adapters.post.create(input, user.id);
      const post = await db.post.create({ data });

      const result = await Promise.allSettled(
        input.images.map(async (img, i) => {
          const key = `temp/${post.id}/${i}`;
          await tempStorage.set(key, img.createReadStream());
          const rs = await tempStorage.get(key);
          return await imageType(rs.read(minimumBytes));
        })
      );
      const allImages = _.every(
        result,
        r => r.status === "fulfilled" && r.value
      );
      if (!allImages) {
        await Promise.allSettled(
          input.images.map(async (_img, i) =>
            tempStorage.remove(`temp/${post.id}/${i}`)
          )
        );
        // TODO: Better error
        throw new Error("Some of them are not image.");
      }

      const imageData = input.images.map((_img, i) => ({
        userId: user.id,
        postId: post.id,
        number: i,
        mime: result[i].value
      }));
      await db.image.createMany({ data: imageData });

      const images = await db.image.findMany({
        where: { postId: post.id },
        orderBy: { number: "asc" }
      });
      for (let i = 0; i < images.length; i++) {
        const key = `temp/${post.id}/${i}`;
        const image = images[i];
        await uploadStorage.set(
          `upload/${image.id}/origin`,
          await tempStorage.get(key)
        );
      }
      return await db.post.findUniqueOrThrow({ where: { id: post.id } });
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
