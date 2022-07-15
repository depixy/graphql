import { default as fastify } from "fastify";
import { mkdir } from "fs/promises";
import { default as cookiePlugin } from "@fastify/cookie";
import databasePlugin from "@depixy/database";
import authPlugin from "@depixy/auth";
import graphqlPlugin from "@depixy/graphql";
import storagePlugin from "@depixy/storage";

import type { FastifyInstance } from "fastify";

export async function initFastify(): Promise<FastifyInstance> {
  const app = fastify();
  await mkdir("./tmp");
  await app.register(storagePlugin, {
    type: "local",
    engine: { local: { path: "./tmp" } }
  });
  await app.register(databasePlugin);
  await app.register(cookiePlugin, {
    secret: "my-secret",
    parseOptions: {}
  });
  await app.register(authPlugin, {
    secret: "my-secret"
  });
  await app.register(graphqlPlugin);
  return app;
}
