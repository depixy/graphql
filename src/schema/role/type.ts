import { default as gql } from "graphql-tag";

import type { Resolvers } from "@depixy/graphql/schema/type";

export const typeDefs = gql`
  type Role {
    id: ID!
    name: String!
    editable: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Roles {
    count(input: RoleWhereInput): Int!
    edges(
      input: RoleWhereInput
      pagination: Pagination!
      orderBy: [RoleOrderBy!]
    ): [Role!]!
    pageInfo: PageInfo!
  }
`;

export const resolvers: Resolvers = {};
