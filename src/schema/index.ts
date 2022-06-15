import { makeExecutableSchema } from "@graphql-tools/schema";

import type {
  IResolvers as GTIResolvers,
  TypeSource
} from "@graphql-tools/utils";
import type { IResolvers } from "mercurius";
import type { GraphQLSchema } from "graphql";

import * as scalar from "./scalar.js";

interface PartialSchema {
  typeDefs?: TypeSource;
  resolvers?: IResolvers;
}

function mergeSchema(...schemas: PartialSchema[]): GraphQLSchema {
  const typeDefs: TypeSource[] = [];
  const resolvers: GTIResolvers[] = [];
  for (const schema of schemas) {
    if (schema.typeDefs) {
      typeDefs.push(schema.typeDefs);
    }
    if (schema.resolvers) {
      resolvers.push(schema.resolvers as GTIResolvers);
    }
  }
  return makeExecutableSchema({
    typeDefs,
    resolvers
  });
}

export const schema = mergeSchema(scalar);
