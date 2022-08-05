import type { StorageEngine } from "@depixy/storage";
import type { Adapters } from "./adapter/index.js";

declare module "fastify" {
  interface FastifyInstance {
    adapters: Adapters;
    uploadStorage: StorageEngine;
    tempStorage: StorageEngine;
  }
}
