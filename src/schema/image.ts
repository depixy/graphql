import { default as gql } from "graphql-tag";

import type { IResolvers } from "mercurius";

export const typeDefs = gql`
  type Image {
    id: ID!
    slug: String!
    name: String!
    post: Post!
    user: User!
    number: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;

export const resolvers: IResolvers = {};
