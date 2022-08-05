import { default as fastifyPlugin } from "fastify-plugin";
import { default as mercurius } from "mercurius";
import { default as mercuriusAuth } from "mercurius-auth";
import graphqlUploadPlugin from "@depixy/graphql-upload";

import schema from "./schema/index.js";
import { mercuriusAuthOptions } from "./auth/index.js";
import adapters from "./adapter/index.js";
import { formatError } from "./error/index.js";

export interface DepixyGraphqlOptions {
  uploadStorage?: string;
  tempStorage?: string;
}

export const plugin = fastifyPlugin<DepixyGraphqlOptions>(
  async (fastify, opts) => {
    if (!opts) {
      throw new Error("Options must be defined");
    }
    const { uploadStorage = "upload", tempStorage = "uploadTemp" } = opts;
    if (!fastify.storage[uploadStorage]) {
      throw new Error(`Storage (${uploadStorage}) is not defined.`);
    }
    if (!fastify.storage[tempStorage]) {
      throw new Error(`Storage (${tempStorage}) is not defined.`);
    }
    fastify.register(async fastify => {
      fastify.decorate("uploadStorage", fastify.storage[uploadStorage]);
      fastify.decorate("tempStorage", fastify.storage[tempStorage]);
      fastify.decorate("adapters", adapters);
      fastify.register(graphqlUploadPlugin);
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
