import { default as fastifyPlugin } from "fastify-plugin";
import { default as mercurius } from "mercurius";
import { default as mercuriusUpload } from "mercurius-upload";

import { schema } from "./schema/index.js";

export interface DepixyGraphqlUserOptions {}

export const plugin = fastifyPlugin<DepixyGraphqlUserOptions>(
  async (fastify, opts) => {
    if (!opts) {
      throw new Error("Options must be defined");
    }
    fastify.register(mercuriusUpload);
    fastify.register(mercurius, {
      schema,
      path: "/api/v1/graphql/user",
      graphiql: false,
      queryDepth: 7
    });
  },
  {
    name: "@depixy/graphql-user",
    dependencies: ["@depixy/auth", "@depixy/database"],
    fastify: "4.x"
  }
);

declare module "fastify" {
  interface FastifyInstance {}
}
