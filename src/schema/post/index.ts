import * as input from "./input.js";
import * as mutation from "./mutation.js";
import * as query from "./query.js";
import * as type from "./type.js";

import type { PartialSchema } from "@depixy/graphql/schema/type";

const schemas: PartialSchema[] = [input, mutation, query, type];

export default schemas;
