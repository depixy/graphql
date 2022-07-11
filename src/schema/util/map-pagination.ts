import type { PageInfo, Pagination } from "@depixy/graphql/schema/generated";

interface Arguments {
  pagination: Pagination;
}

interface Result {
  pageInfo: PageInfo;
}

export function mapPagination(args: Arguments): Result {
  const { pagination } = args;
  const { skip, take } = pagination;
  return {
    pageInfo: {
      skip,
      take
    }
  };
}
