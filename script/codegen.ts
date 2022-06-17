import { default as fastify } from "fastify";
import { codegenMercurius } from "mercurius-codegen";
import { default as mercurius } from "mercurius";
import graphqlUpload from "@depixy/graphql-upload";

import schema from "../src/schema/index.js";

const app = fastify();

app.register(graphqlUpload);
app.register(mercurius, {
  schema,
  path: "/api/v1/graphql/user",
  graphiql: false,
  queryDepth: 7
});

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
