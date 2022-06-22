import { makeExecutableSchema } from "@graphql-tools/schema";

import type {
  IResolvers as GTIResolvers,
  TypeSource
} from "@graphql-tools/utils";
import type { IResolvers } from "mercurius";
import type { GraphQLSchema } from "graphql";

import * as filter from "./filter.js";
import * as image from "./image.js";
import * as post from "./post.js";
import * as tagCategory from "./tag-category.js";
import * as tag from "./tag.js";
import * as role from "./role.js";
import * as scalar from "./scalar.js";
import * as type from "./type.js";
import * as user from "./user.js";

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
  filter,
  image,
  post,
  tagCategory,
  tag,
  role,
  scalar,
  type,
  user
);

export default schema;
