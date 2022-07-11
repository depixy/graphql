import { makeExecutableSchema } from "@graphql-tools/schema";

import type {
  IResolvers as GTIResolvers,
  TypeSource
} from "@graphql-tools/utils";
import type { IResolvers } from "mercurius";
import type { GraphQLSchema } from "graphql";

import commonSchemas from "./common/index.js";
import imageSchemas from "./image/index.js";
import postSchemas from "./post/index.js";
import tagCategorySchemas from "./tag-category/index.js";
import tagSchemas from "./tag/index.js";
import roleSchemas from "./role/index.js";
import userSchemas from "./user/index.js";

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

const schema = mergeSchema(
  ...commonSchemas,
  ...imageSchemas,
  ...postSchemas,
  ...tagCategorySchemas,
  ...tagSchemas,
  ...roleSchemas,
  ...userSchemas
);

export default schema;
