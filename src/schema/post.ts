import { default as gql } from "graphql-tag";
import { assertUser, notNull, wrapError } from "./prisma-util.js";

import type { IResolvers } from "mercurius";

export const typeDefs = gql`
  type Post {
    id: ID!
    slug: String!
    name: String!
    tags: [Tag!]!
    images: [Image!]!
    description: String!
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input PostWhereUniqueInput {
    id: String
    slug: String
  }

  type Posts {
    count(input: PostWhereInput): Int!
    edges(
      input: PostWhereInput
      pagination: Pagination!
      orderBy: [PostOrderBy!]
    ): [Post!]!
    pageInfo: PageInfo!
  }

  input PostWhereInput {
    AND: [PostWhereInput!]
    OR: [PostWhereInput!]
    NOT: [PostWhereInput!]
    id: IDFilter
    slug: StringFilter
    name: StringFilter
    tags: TagListFilter
    createdAt: DateTimeFilter
    updatedAt: DateTimeFilter
  }

  input PostOrderBy {
    id: Order
    slug: Order
    name: Order
    createdAt: Order
    updatedAt: Order
  }

  extend type Query {
    post(input: PostWhereUniqueInput!): Post
    posts(pagination: Pagination!): Posts!
  }

  input PostCreateInput {
    slug: String!
    name: String!
    description: String!
    images: [Upload!]!
  }

  input PostUpdateInput {
    id: ID!
    slug: String
    name: String
  }

  extend type Mutation {
    createPost(input: PostCreateInput!): Post!
    updatePost(input: PostUpdateInput!): Post!
    removePosts(input: PostWhereInput!): BatchPayload!
  }
`;

export const resolvers: IResolvers = {
  Query: {
    post: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = adapters.post.whereUnique(input);
      return db.post.findUnique({ where }).catch(wrapError);
    },
    posts: async (_parent, args) => {
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
  Posts: {
    count: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = input ? adapters.post.where(input) : {};
      return await db.post.count({ where }).catch(wrapError);
    },
    edges: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { pagination, input, orderBy: orderByInput } = args;
      const { skip, take } = pagination;
      const where = input ? adapters.post.where(input) : {};
      const orderBy = orderByInput ? adapters.post.orderBy(orderByInput) : {};
      return await db.post
        .findMany({ skip, take, where, orderBy })
        .catch(wrapError);
    }
  },
  Post: {
    images: async (parent, _args, ctx) => {
      const { db } = ctx.app;
      return await db.post
        .findUnique({ where: { id: parent.id } })
        .images()
        .catch(wrapError);
    },
    tags: async (parent, _args, ctx) => {
      const { db } = ctx.app;
      return await db.post
        .findUnique({ where: { id: parent.id } })
        .tags()
        .catch(wrapError);
    },
    user: async (parent, _args, ctx) => {
      const { db } = ctx.app;
      return await db.post
        .findUnique({ where: { id: parent.id } })
        .user()
        .then(notNull)
        .catch(wrapError);
    }
  },
  Mutation: {
    createPost: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const user = assertUser(ctx);
      const data = adapters.post.create(input, user.id);
      return await db.post.create({ data }).catch(wrapError);
    },
    updatePost: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const data = adapters.post.update(input);
      return await db.post
        .update({ data, where: { id: input.id } })
        .catch(wrapError);
    },
    removePosts: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = adapters.post.where(input);
      return await db.post.deleteMany({ where }).catch(wrapError);
    }
  }
};
