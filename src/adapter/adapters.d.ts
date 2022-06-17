import type { Adapters } from "./index.js"

declare module "fastify" {
  interface FastifyInstance {
    adapters: Adapters;
  }
}
