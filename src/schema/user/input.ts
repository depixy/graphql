import { default as gql } from "graphql-tag";

export const typeDefs = gql`
  input UserWhereUniqueInput {
    id: String
    loginName: String
    displayName: String
  }

  input UserWhereInput {
    AND: [UserWhereInput!]
    OR: [UserWhereInput!]
    NOT: [UserWhereInput!]
    id: IDFilter
    displayName: StringFilter
    loginName: StringFilter
    email: StringFilter
    createdAt: DateTimeFilter
    updatedAt: DateTimeFilter
  }

  input UserOrderBy {
    id: Order
    name: Order
    userCount: Order
    createdAt: Order
    updatedAt: Order
  }

  input UserCreateInput {
    loginName: String!
    displayName: String!
    email: String!
    password: String!
  }

  input UserUpdateInput {
    id: ID!
    displayName: String
    email: String
    password: String
  }

  input MeUpdateInput {
    displayName: String
    email: String
    password: String
  }

  input LoginInput {
    loginName: String!
    password: String!
  }
`;
