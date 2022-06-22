import { default as gql } from "graphql-tag";

import type { IResolvers } from "mercurius";

export const typeDefs = gql`
  type Role {
    id: ID!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

export const resolvers: IResolvers = {};
