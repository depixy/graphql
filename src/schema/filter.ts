import { default as gql } from "graphql-tag";

export const typeDefs = gql`
  input BooleanFilter {
    equal: Boolean!
  }

  input StringFilter {
    contain: String
    endWith: String
    equal: String
    in: [String!]
    not: StringFilter
    notIn: [String!]
    startWith: String
  }

  input StringNullableFilter {
    contain: String
    endWith: String
    equal: String
    in: [String!]
    not: StringFilter
    notIn: [String!]
    startWith: String
  }

  input IDFilter {
    equal: ID
    in: [ID!]
    not: IDFilter
    notIn: [ID!]
  }

  input DateTimeFilter {
    equal: DateTime
    gt: DateTime
    gte: DateTime
    in: [DateTime!]
    lt: DateTime
    lte: DateTime
    not: DateTimeFilter
    notIn: [DateTime!]
  }

  input DateTimeNullableFilter {
    equal: DateTime
    gt: DateTime
    gte: DateTime
    in: [DateTime!]
    lt: DateTime
    lte: DateTime
    not: DateTimeFilter
    notIn: [DateTime!]
  }

  input TagListFilter {
    every: TagWhereInput
    some: TagWhereInput
    none: TagWhereInput
  }
`;
