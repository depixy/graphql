import { default as gql } from "graphql-tag";

export const typeDefs = gql`
  input TagCategoryWhereUniqueInput {
    id: String
    slug: String
    name: String
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

  input TagCategoryCreateInput {
    slug: String!
    name: String!
  }

  input TagCategoryUpdateInput {
    id: ID!
    slug: String
    name: String
  }
`;
