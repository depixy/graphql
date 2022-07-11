import { default as gql } from "graphql-tag";

export const typeDefs = gql`
  type BatchPayload {
    count: Int!
  }
`;
