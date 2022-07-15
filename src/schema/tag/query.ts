import { default as gql } from "graphql-tag";
import _ from "lodash";
import { mapPagination } from "@depixy/graphql/schema/util";

import type { Resolvers } from "@depixy/graphql/schema/type";

export const typeDefs = gql`
  extend type Query {
    tag(input: TagWhereUniqueInput!): Tag
    tags(pagination: Pagination!): Tags!
    predictTag(input: TagPredictInput!): [Tag!]!
  }
`;

export const resolvers: Resolvers = {
  Query: {
    tag: async (_parent, args, ctx) => {
      const { db, adapters } = ctx.app;
      const { input } = args;
      const where = adapters.tag.whereUnique(input);
      return db.tag.findUnique({ where });
    },
    tags: async (_parent, args) => mapPagination(args),
    predictTag: async (_parent, args, ctx) => {
      const predictSize = 10;
      const { db } = ctx.app;
      const { data } = args.input;
      let result = await db.tag.findMany({
        where: { name: { startsWith: data, mode: "insensitive" } },
        orderBy: [{ name: "asc" }],
        take: predictSize
      });

      if (result.length >= predictSize) {
        return result.slice(0, predictSize);
      }

      result = _.uniq(
        _.concat(
          result,
          await db.tag.findMany({
            where: {
              slug: { startsWith: data, mode: "insensitive" },
              id: { notIn: result.map(t => t.id) }
            },
            orderBy: [{ slug: "asc" }],
            take: predictSize
          })
        )
      );

      if (result.length >= predictSize) {
        return result.slice(0, predictSize);
      }

      result = _.uniq(
        _.concat(
          result,
          await db.tag.findMany({
            where: {
              name: { contains: data, mode: "insensitive" },
              id: { notIn: result.map(t => t.id) }
            },
            orderBy: [{ name: "asc" }],
            take: predictSize
          })
        )
      );

      if (result.length >= predictSize) {
        return result.slice(0, predictSize);
      }

      result = _.uniq(
        _.concat(
          result,
          await db.tag.findMany({
            where: {
              slug: { contains: data, mode: "insensitive" },
              id: { notIn: result.map(t => t.id) }
            },
            orderBy: [{ slug: "asc" }],
            take: predictSize
          })
        )
      );
      return result.slice(0, predictSize);
    }
  }
};
