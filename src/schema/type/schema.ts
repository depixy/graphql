import type { TypeSource } from "@graphql-tools/utils";
import type { IResolvers } from "mercurius";

export type TypeDefs = TypeSource;
export type Resolvers = IResolvers;

export interface Schema {
  typeDefs: TypeDefs;
  resolvers: Resolvers;
}

export type PartialSchema = Partial<Schema>;
