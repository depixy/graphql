import { default as gql } from "graphql-tag";

export const typeDefs = gql`
  input RoleWhereUniqueInput {
    id: String
    name: String
  }

  input RoleWhereInput {
    AND: [RoleWhereInput!]
    OR: [RoleWhereInput!]
    NOT: [RoleWhereInput!]
    id: IDFilter
    name: StringFilter
    editable: BooleanFilter
    createdAt: DateTimeFilter
    updatedAt: DateTimeFilter
  }

  input RoleOrderBy {
    id: Order
    name: Order
    editable: Order
    createdAt: Order
    updatedAt: Order
  }

  input RoleCreateInput {
    name: String!
  }

  input RoleUpdateInput {
    id: ID!
    name: String
  }
`;
