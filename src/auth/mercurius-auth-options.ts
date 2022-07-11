import _ from "lodash";

import type {
  MercuriusAuthContext,
  MercuriusAuthOptions
} from "mercurius-auth";
import type { AuthContext } from "@depixy/auth";
import type { Resolvers } from "@depixy/graphql/schema/generated";

// TODO: config permissions
type Role = "user" | "admin" | "guest";

interface FieldPolicy {
  role: Role;
}

type Policy = {
  [key in keyof Resolvers]?: {
    [key2 in keyof NonNullable<Resolvers[key]>]: FieldPolicy;
  };
};

const policy: Policy = {
  Query: {
    me: { role: "user" },
    users: { role: "admin" }
  },
  Mutation: {
    createTag: { role: "admin" },
    updateTag: { role: "admin" },
    removeTags: { role: "admin" },
    updateMe: { role: "user" },
    updateUser: { role: "admin" },
    removeUsers: { role: "admin" },
    createTagCategory: { role: "admin" },
    updateTagCategory: { role: "admin" },
    removeTagCategories: { role: "admin" },
    createRole: { role: "admin" },
    updateRole: { role: "admin" },
    removeRoles: { role: "admin" }
  }
};

export const mercuriusAuthOptions: MercuriusAuthOptions = {
  mode: "external",
  authContext: (ctx): MercuriusAuthContext => ctx.reply.request.auth,
  async applyPolicy(policy: FieldPolicy, _parent, _args, ctx) {
    const roles = ctx.auth?.user?.roles ?? [];
    if (policy.role === "guest") {
      return true;
    }
    return _.some(roles, { name: policy.role });
  },
  policy
};

declare module "mercurius-auth" {
  interface MercuriusAuthContext extends AuthContext {}

  interface MercuriusAuthTypePolicy {}
}
