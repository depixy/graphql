import * as batchPayload from "./batch-payload.js";
import * as filter from "./filter.js";
import * as order from "./order.js";
import * as pageInfo from "./page-info.js";
import * as pagination from "./pagination.js";
import * as scalar from "./scalar.js";

import type { PartialSchema } from "@depixy/graphql/schema/type";

const schemas: PartialSchema[] = [
  batchPayload,
  filter,
  order,
  pageInfo,
  pagination,
  scalar
];

export default schemas;
