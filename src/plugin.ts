import { default as fastifyPlugin } from "fastify-plugin";
import { default as mercurius } from "mercurius";
import graphqlUpload from "@depixy/graphql-upload";

import schema from "./schema/index.js";
import adapters from "./adapter/index.js";

export interface DepixyGraphqlUserOptions {}

export const plugin = fastifyPlugin<DepixyGraphqlUserOptions>(
  async (fastify, opts) => {
    if (!opts) {
      throw new Error("Options must be defined");
    }
    fastify.register(async fastify => {
      fastify.decorate("adapters", adapters);
      fastify.register(graphqlUpload);
      fastify.register(mercurius, {
        schema,
        path: "/api/v1/graphql/user",
        graphiql: false,
        queryDepth: 7
      });
    });
  },
  {
    name: "@depixy/graphql-user",
    dependencies: ["@depixy/auth", "@depixy/database"],
    fastify: "4.x"
  }
);
