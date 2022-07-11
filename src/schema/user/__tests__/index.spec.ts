import { assert } from "chai";
import _ from "lodash";
import {
  getApiSdk,
  initFastify,
  mapCookies,
  Order
} from "@depixy/graphql/schema/test";

import type { FastifyInstance } from "fastify";
import type { ApiSdk, ExtResponse } from "@depixy/graphql/schema/test";

describe("user", () => {
  let app: FastifyInstance;
  let sdk: ApiSdk;

  before(async () => {
    app = await initFastify();
    sdk = getApiSdk(app);
  });

  describe("#createUser()", () => {
    it("should create admin user if no users exist", async () => {
      const { data, errors } = await sdk.createUser({
        input: {
          loginName: "admin",
          displayName: "Admin",
          email: "admin@example.com",
          password: "password"
        }
      });
      assert.notExists(errors, "errors should not exist");
      const {
        loginName,
        displayName,
        email,
        roles = []
      } = data?.createUser ?? {};
      assert.strictEqual(loginName, "admin", "loginName should be equal");
      assert.strictEqual(displayName, "Admin", "displayName should be equal");
      assert.strictEqual(email, "admin@example.com", "email should be equal");
      assert.strictEqual(roles.length, 2, "roles count should be equal");
      assert.isTrue(
        _.some(roles, { name: "admin" }),
        "roles should include admin"
      );
      assert.isTrue(
        _.some(roles, { name: "user" }),
        "roles should include user"
      );
    });

    it("should create admin user if no users exist", async () => {
      const { data, errors } = await sdk.createUser({
        input: {
          loginName: "user",
          displayName: "User",
          email: "user@example.com",
          password: "password"
        }
      });
      assert.notExists(errors, "errors should not exist");
      const {
        loginName,
        displayName,
        email,
        roles = []
      } = data?.createUser ?? {};
      assert.strictEqual(loginName, "user", "loginName should be equal");
      assert.strictEqual(displayName, "User", "displayName should be equal");
      assert.strictEqual(email, "user@example.com", "email should be equal");
      assert.strictEqual(roles.length, 1, "roles count should be equal");
      assert.isTrue(
        _.some(roles, { name: "user" }),
        "roles should include user"
      );
    });

    it("should not create user with same loginName", async () => {
      const { errors = [] } = await sdk.createUser({
        input: {
          loginName: "user",
          displayName: "User2",
          email: "user@example.com",
          password: "password"
        }
      });
      assert.isAtLeast(errors.length, 1, "errors should exist");
    });
  });

  describe("#user()", () => {
    it("should query by loginName", async () => {
      const { data, errors } = await sdk.user({
        input: {
          loginName: "admin"
        }
      });
      assert.notExists(errors, "errors should not exist");
      const { loginName, displayName, roles = [] } = data?.user ?? {};
      assert.strictEqual(loginName, "admin", "loginName should be equal");
      assert.strictEqual(displayName, "Admin", "displayName should be equal");
      assert.strictEqual(roles.length, 2, "roles count should be equal");
      assert.isTrue(
        _.some(roles, { name: "admin" }),
        "roles should include admin"
      );
      assert.isTrue(
        _.some(roles, { name: "user" }),
        "roles should include user"
      );
    });
  });

  describe("#users()", () => {
    it("should query by login cookie", async () => {
      const result = await sdk.login({
        input: {
          loginName: "admin",
          password: "password"
        }
      });
      const extensions: any = result?.extensions;
      const extRes: ExtResponse = extensions.response;
      const cookies = mapCookies(extRes.cookies);

      const { data, errors } = await sdk.users(
        {
          pagination: { skip: 0, take: 10 },
          orderBy: [{ createdAt: Order.Asc }]
        },
        { cookies }
      );
      assert.notExists(errors, "errors should not exist");
      const { count, edges = [] } = data?.users ?? {};
      assert.strictEqual(count, 2);
      const { loginName, displayName, roles = [] } = edges[0];
      assert.strictEqual(loginName, "admin", "loginName should be equal");
      assert.strictEqual(displayName, "Admin", "displayName should be equal");
      assert.strictEqual(roles.length, 2, "roles count should be equal");
      assert.isTrue(
        _.some(roles, { name: "admin" }),
        "roles should include admin"
      );
      assert.isTrue(
        _.some(roles, { name: "user" }),
        "roles should include user"
      );
    });

    it("should throw error if not login", async () => {
      const { errors } = await sdk.users({
        pagination: { skip: 0, take: 10 }
      });
      assert.exists(errors, "errors should exist");
    });
  });

  describe("#login()", () => {
    it("should login with loginName and password", async () => {
      const { data, errors } = await sdk.login({
        input: {
          loginName: "admin",
          password: "password"
        }
      });
      const { loginName, displayName, email, roles = [] } = data?.login ?? {};
      assert.notExists(errors, "errors should not exist");
      assert.strictEqual(loginName, "admin", "loginName should be equal");
      assert.strictEqual(displayName, "Admin", "displayName should be equal");
      assert.strictEqual(email, "admin@example.com", "email should be equal");
      assert.strictEqual(roles.length, 2, "roles count should be equal");
      assert.isTrue(
        _.some(roles, { name: "admin" }),
        "roles should include admin"
      );
      assert.isTrue(
        _.some(roles, { name: "user" }),
        "roles should include user"
      );
    });
  });

  describe("#me()", () => {
    it("should query by login cookie", async () => {
      const result = await sdk.login({
        input: {
          loginName: "admin",
          password: "password"
        }
      });
      const extensions: any = result?.extensions;
      const extRes: ExtResponse = extensions.response;
      const cookies = mapCookies(extRes.cookies);
      const { data, errors } = await sdk.me({}, { cookies });
      const { loginName, displayName, email, roles = [] } = data?.me ?? {};
      assert.notExists(errors, "errors should not exist");
      assert.strictEqual(loginName, "admin", "loginName should be equal");
      assert.strictEqual(displayName, "Admin", "displayName should be equal");
      assert.strictEqual(email, "admin@example.com", "email should be equal");
      assert.strictEqual(roles.length, 2, "roles count should be equal");
      assert.isTrue(
        _.some(roles, { name: "admin" }),
        "roles should include admin"
      );
      assert.isTrue(
        _.some(roles, { name: "user" }),
        "roles should include user"
      );
    });

    it("should throw error if not login", async () => {
      const { errors } = await sdk.me();
      assert.exists(errors, "errors should exist");
    });
  });

  describe("#updateMe()", () => {
    it("should update by login cookie", async () => {
      const result = await sdk.login({
        input: {
          loginName: "admin",
          password: "password"
        }
      });
      const extensions: any = result?.extensions;
      const extRes: ExtResponse = extensions.response;
      const cookies = mapCookies(extRes.cookies);
      const { data, errors } = await sdk.updateMe(
        {
          input: {
            displayName: "Admin2"
          }
        },
        { cookies }
      );
      const {
        loginName,
        displayName,
        email,
        roles = []
      } = data?.updateMe ?? {};
      assert.notExists(errors, "errors should not exist");
      assert.strictEqual(loginName, "admin", "loginName should be equal");
      assert.strictEqual(displayName, "Admin2", "displayName should be equal");
      assert.strictEqual(email, "admin@example.com", "email should be equal");
      assert.strictEqual(roles.length, 2, "roles count should be equal");
      assert.isTrue(
        _.some(roles, { name: "admin" }),
        "roles should include admin"
      );
      assert.isTrue(
        _.some(roles, { name: "user" }),
        "roles should include user"
      );
    });
  });

  describe("#updateUser()", () => {
    it("should update by login cookie", async () => {
      const loginResult = await sdk.login({
        input: {
          loginName: "admin",
          password: "password"
        }
      });
      const extensions: any = loginResult?.extensions;
      const extRes: ExtResponse = extensions.response;
      const cookies = mapCookies(extRes.cookies);

      const userResult = await sdk.user({
        input: {
          loginName: "admin"
        }
      });
      const { data, errors } = await sdk.updateUser(
        {
          input: {
            id: userResult.data?.user?.id ?? "",
            displayName: "Admin"
          }
        },
        { cookies }
      );
      const {
        loginName,
        displayName,
        email,
        roles = []
      } = data?.updateUser ?? {};
      assert.notExists(errors, "errors should not exist");
      assert.strictEqual(loginName, "admin", "loginName should be equal");
      assert.strictEqual(displayName, "Admin", "displayName should be equal");
      assert.strictEqual(email, "admin@example.com", "email should be equal");
      assert.strictEqual(roles.length, 2, "roles count should be equal");
      assert.isTrue(
        _.some(roles, { name: "admin" }),
        "roles should include admin"
      );
      assert.isTrue(
        _.some(roles, { name: "user" }),
        "roles should include user"
      );
    });
  });

  describe("#logout()", () => {
    let cookies: ReturnType<typeof mapCookies> = {};

    it("should logout by login cookie", async () => {
      const result = await sdk.login({
        input: {
          loginName: "admin",
          password: "password"
        }
      });
      const extensions: any = result?.extensions;
      const extRes: ExtResponse = extensions.response;
      cookies = mapCookies(extRes.cookies);
      const { data, errors } = await sdk.logout({}, { cookies });
      assert.notExists(errors, "errors should not exist");
      assert.isNull(data?.logout, "response should be null");
    });

    it("should throw error if token is used after logout", async () => {
      const { errors } = await sdk.users(
        {
          pagination: { skip: 0, take: 10 },
          orderBy: [{ createdAt: Order.Asc }]
        },
        { cookies }
      );
      assert.exists(errors, "errors should exist");
    });

    it("should not throw error if not login", async () => {
      const { errors } = await sdk.logout({}, { cookies });
      assert.notExists(errors, "errors should not exist");
    });
  });

  describe("#removeUsers()", () => {
    it("should remove by loginName", async () => {
      const result = await sdk.login({
        input: {
          loginName: "admin",
          password: "password"
        }
      });
      const extensions: any = result?.extensions;
      const extRes: ExtResponse = extensions.response;
      const cookies = mapCookies(extRes.cookies);
      const { data, errors } = await sdk.removeUsers(
        {
          input: {
            loginName: { in: ["admin", "user"] }
          }
        },
        { cookies }
      );
      const { count } = data?.removeUsers ?? {};
      assert.notExists(errors, "errors should not exist");
      assert.strictEqual(count, 2, "count should be equal");
    });
  });

  after(async () => {
    await app.close();
  });
});
