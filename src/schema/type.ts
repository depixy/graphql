import { default as gql } from "graphql-tag";

export const typeDefs = gql`
  input Pagination {
    skip: Int!
    take: Int!
  }

  enum Order {
    asc
    desc
  }

  type PageInfo {
    skip: Int!
    take: Int!
  }

  type BatchPayload {
    count: Int!
  }
`;

declare module "fastify" {
  interface FastifyInstance {}
}
