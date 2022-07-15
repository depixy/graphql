import type { Adapters } from "./adapter/index.js"

declare module "fastify" {
  interface FastifyInstance {
    adapters: Adapters;
  }
}
