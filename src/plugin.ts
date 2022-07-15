import { default as fastifyPlugin } from "fastify-plugin";
import { default as mercurius } from "mercurius";
import { default as mercuriusAuth } from "mercurius-auth";
import graphqlUploadPlugin from "@depixy/graphql-upload";
import storagePlugin from "@depixy/storage";

import schema from "./schema/index.js";
import { mercuriusAuthOptions } from "./auth/index.js";
import adapters from "./adapter/index.js";
import { formatError } from "./error/index.js";

export interface DepixyGraphqlOptions {}

export const plugin = fastifyPlugin<DepixyGraphqlOptions>(
  async (fastify, opts) => {
    if (!opts) {
      throw new Error("Options must be defined");
    }
    fastify.register(async fastify => {
      fastify.decorate("adapters", adapters);
      fastify.register(graphqlUploadPlugin);
      fastify.register(storagePlugin);
      fastify.register(mercurius, {
        schema,
        path: "/api/v1/graphql",
        graphiql: false,
        queryDepth: 7,
        errorFormatter: formatError
      });
      fastify.register(mercuriusAuth, mercuriusAuthOptions);
    });
  },
  {
    name: "@depixy/graphql",
    dependencies: ["@depixy/auth", "@depixy/database", "@depixy/storage"],
    fastify: "4.x"
  }
);
