import { default as gql } from "graphql-tag";

export const typeDefs = gql`
  enum Order {
    asc
    desc
  }
`;
