import { default as gql } from "graphql-tag";

export const typeDefs = gql`
  input PostWhereUniqueInput {
    id: String
    slug: String
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
`;
