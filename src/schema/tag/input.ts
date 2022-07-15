import { default as gql } from "graphql-tag";

export const typeDefs = gql`
  input TagWhereUniqueInput {
    id: String
    slug: String
    name: String
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

  input TagPredictInput {
    data: String!
  }
`;
