import { getSdk } from "./type.generated.js";
import { print } from "graphql";

import type { FastifyInstance } from "fastify";
import type { InjectOptions, Response } from "light-my-request";

export interface RequestOptions {
  headers?: InjectOptions["headers"];
  cookies?: InjectOptions["cookies"];
}

export interface Cookie {
  name: string;
  value: string;
}

export type ApiSdk = ReturnType<typeof getSdk>;

export type ExtResponse = {
  headers: Response["headers"];
  cookies: Response["cookies"];
  statusCode: Response["statusCode"];
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getApiSdk(app: FastifyInstance) {
  return getSdk(async (doc, variables, opts?: RequestOptions) => {
    const res = await app.inject({
      method: "POST",
      url: "/api/v1/graphql",
      payload: {
        query: print(doc),
        variables
      },
      ...opts
    });
    const json: {
      data?: unknown;
      errors?: { message: string; extensions?: unknown }[];
      extensions?: Record<string, unknown>;
    } = await res.json();
    const response = {
      headers: res.headers,
      cookies: res.cookies,
      statusCode: res.statusCode
    };
    const { extensions = {} } = json;
    json.extensions = extensions;
    json.extensions.response = response;
    return json as any;
  });
}

export function mapCookies(
  cookies: Response["cookies"]
): Exclude<InjectOptions["cookies"], undefined> {
  const result: InjectOptions["cookies"] = {};
  for (const cookie of cookies) {
    const c = cookie as Cookie;
    result[c.name] = c.value;
  }
  return result;
}
