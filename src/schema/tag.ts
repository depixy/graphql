import { default as gql } from "graphql-tag";
import { assertUser, notNull, wrapError } from "./prisma-util.js";

import type { IResolvers } from "mercurius";

export const typeDefs = gql`
  type Tag {
    id: ID!
    slug: String!
    name: String!
    category: TagCategory!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input TagWhereUniqueInput {
    id: String
    slug: String
    name: String
  }

  type Tags {
    count(input: TagWhereInput): Int!
    edges(
      input: TagWhereInput
      pagination: Pagination!
      orderBy: [TagOrderBy!]
    ): [Tag!]!
    pageInfo: PageInfo!
  }

  input TagWhereInput {
    AND: [TagWhereInput!]
    OR: [TagWhereInput!]
    NOT: [TagWhereInput!]
    id: IDFilter
    slug: StringFilter
    name: StringFilter
    createdAt: DateTimeFilter
    updatedAt: DateTimeFilter
  }

  input TagOrderBy {
    id: Order
    slug: Order
    name: Order
    createdAt: Order
    updatedAt: Order
  }

  extend type Query {
    tag(input: TagWhereUniqueInput!): Tag
    tags(pagination: Pagination!): Tags!
  }

  input TagCreateInput {
    categoryId: String!
    slug: String!
    name: String!
  }

  input TagUpdateInput {
    id: ID!
    slug: String
    name: String
  }

  extend type Mutation {
    createTag(input: TagCreateInput!): Tag!
    updateTag(input: TagUpdateInput!): Tag!
    removeTags(input: TagWhereInput!): BatchPayload!
  }
`;

export const resolvers: IResolvers = {
  Query: {
    tag: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = adapters.tag.whereUnique(input);
      return db.tag.findUnique({ where }).catch(wrapError);
    },
    tags: async (_parent, args) => {
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
  Tags: {
    count: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = input ? adapters.tag.where(input) : {};
      return await db.tag.count({ where }).catch(wrapError);
    },
    edges: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { pagination, input, orderBy: orderByInput } = args;
      const { skip, take } = pagination;
      const where = input ? adapters.tag.where(input) : {};
      const orderBy = orderByInput ? adapters.tag.orderBy(orderByInput) : {};
      return await db.tag
        .findMany({ skip, take, where, orderBy })
        .catch(wrapError);
    }
  },
  Tag: {
    category: async (parent, _args, ctx) => {
      const { db } = ctx.app;
      return await db.tag
        .findUnique({ where: { id: parent.id } })
        .category()
        .then(notNull)
        .catch(wrapError);
    }
  },
  Mutation: {
    createTag: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      assertUser(ctx);
      const data = adapters.tag.create(input);
      return await db.tag.create({ data }).catch(wrapError);
    },
    updateTag: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const data = adapters.tag.update(input);
      return await db.tag
        .update({ data, where: { id: input.id } })
        .catch(wrapError);
    },
    removeTags: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      assertUser(ctx);
      const where = adapters.tag.where(input);
      return await db.tag.deleteMany({ where }).catch(wrapError);
    }
  }
};
