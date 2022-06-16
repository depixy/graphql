import { default as fastify } from "fastify";
import { codegenMercurius } from "mercurius-codegen";

import graphqlUser from "../src/index.js";

const app = fastify();
graphqlUser[Symbol.for("plugin-meta")].dependencies = [];
await app.register(graphqlUser);

codegenMercurius(app, {
  targetPath: "./src/graphql.generated.ts",
  codegenConfig: {
    scalars: {
      BigInt: "bigint",
      Date: "Date",
      Time: "Date",
      DateTime: "Date",
      UUID: "string",
      Upload: "FileUpload"
    }
  },
  preImportCode: `
  import type { FileUpload } from "@depixy/graphql-upload";
  `
}).catch(console.error);
