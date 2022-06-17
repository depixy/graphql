import { default as gql } from "graphql-tag";
import { wrapError } from "./prisma-util.js";

import type { IResolvers } from "mercurius";

export const typeDefs = gql`
  type TagCategory {
    id: ID!
    slug: String!
    name: String!
    tags: [Tag!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input TagCategoryWhereUniqueInput {
    id: String
    slug: String
    name: String
  }

  type TagCategories {
    count(input: TagCategoryWhereInput): Int!
    edges(
      input: TagCategoryWhereInput
      pagination: Pagination!
      orderBy: [TagCategoryOrderBy!]
    ): [TagCategory!]!
    pageInfo: PageInfo!
  }

  input TagCategoryWhereInput {
    AND: [TagCategoryWhereInput!]
    OR: [TagCategoryWhereInput!]
    NOT: [TagCategoryWhereInput!]
    id: IDFilter
    slug: StringFilter
    name: StringFilter
    tags: TagListFilter
    createdAt: DateTimeFilter
    updatedAt: DateTimeFilter
  }

  input TagCategoryOrderBy {
    id: Order
    slug: Order
    name: Order
    tagCount: Order
    createdAt: Order
    updatedAt: Order
  }

  extend type Query {
    tagCategory(input: TagCategoryWhereUniqueInput!): TagCategory
    tagCategories(pagination: Pagination!): TagCategories!
  }

  input TagCategoryCreateInput {
    slug: String!
    name: String!
  }

  input TagCategoryUpdateInput {
    id: ID!
    slug: String
    name: String
  }

  extend type Mutation {
    createTagCategory(input: TagCategoryCreateInput!): TagCategory!
    updateTagCategory(input: TagCategoryUpdateInput!): TagCategory!
    removeTagCategories(input: TagCategoryWhereInput!): BatchPayload!
  }
`;

export const resolvers: IResolvers = {
  Query: {
    tagCategory: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = adapters.tagCategory.whereUnique(input);
      return await db.tagCategory.findUnique({ where }).catch(wrapError);
    },
    tagCategories: async (_parent, args) => {
      const { pagination } = args;
      const { skip, take } = pagination;
      return {
        _args: args,
        pageInfo: {
          skip,
          take
        }
      };
    }
  },
  TagCategories: {
    count: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = input ? adapters.tagCategory.where(input) : {};
      return await db.tagCategory.count({ where }).catch(wrapError);
    },
    edges: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { pagination, input, orderBy: orderByInput } = args;
      const { skip, take } = pagination;
      const where = input ? adapters.tagCategory.where(input) : {};
      const orderBy = orderByInput
        ? adapters.tagCategory.orderBy(orderByInput)
        : {};
      return await db.tagCategory
        .findMany({ skip, take, where, orderBy })
        .catch(wrapError);
    }
  },
  TagCategory: {
    tags: async (parent, _args, ctx) => {
      const { db } = ctx.app;
      return await db.tagCategory
        .findUnique({ where: { id: parent.id } })
        .tags()
        .catch(wrapError);
    }
  },
  Mutation: {
    createTagCategory: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const data = adapters.tagCategory.create(input);
      return await db.tagCategory.create({ data }).catch(wrapError);
    },
    updateTagCategory: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const data = adapters.tagCategory.update(input);
      return await db.tagCategory
        .update({ data, where: { id: input.id } })
        .catch(wrapError);
    },
    removeTagCategories: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = adapters.tagCategory.where(input);
      return await db.tagCategory.deleteMany({ where }).catch(wrapError);
    }
  }
};
