import {
  BigIntResolver,
  DateResolver,
  DateTimeResolver,
  TimeResolver,
  UUIDResolver,
  VoidResolver
} from "graphql-scalars";
import { default as gql } from "graphql-tag";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";

import type { IResolvers } from "mercurius";

export const typeDefs = gql`
  scalar BigInt
  scalar Date
  scalar Time
  scalar DateTime
  scalar UUID
  scalar Void
  scalar Upload

  type Query {
    hello: Date
  }
  # type Mutation
`;

export const resolvers: IResolvers = {
  BigInt: BigIntResolver,
  Date: DateResolver,
  Time: TimeResolver,
  DateTime: DateTimeResolver,
  UUID: UUIDResolver,
  Void: VoidResolver,
  Upload: GraphQLUpload
};
