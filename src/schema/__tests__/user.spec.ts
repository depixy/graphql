import { assert } from "chai";
import _ from "lodash";
import { default as fastify } from "fastify";
import databasePlugin from "@depixy/database";
import authPlugin from "@depixy/auth";
import { default as cookiePlugin } from "@fastify/cookie";
import { plugin as graphqlPlugin } from "../../plugin.js";
import { getSdk, mapCookies } from "./util.js";

import type { FastifyInstance } from "fastify";
import type { ExtResponse, Sdk } from "./util.js";

describe("user", () => {
  let app: FastifyInstance;
  let sdk: Sdk;

  before(async () => {
    app = fastify();
    await app.register(databasePlugin);
    await app.register(cookiePlugin, {
      secret: "my-secret",
      parseOptions: {}
    });
    await app.register(authPlugin, {
      secret: "my-secret"
    });
    await app.register(graphqlPlugin);
    sdk = getSdk(app);
  });

  describe("#createFirstUser()", () => {
    it("should create admin user if no users exist", async () => {
      const { data, errors } = await sdk.createFirstUser({
        input: {
          loginName: "loginName",
          displayName: "displayName",
          email: "a@a.com",
          password: "password"
        }
      });
      assert.notExists(errors, "errors should not exist");
      const {
        loginName,
        displayName,
        email,
        roles = []
      } = data?.createFirstUser ?? {};
      assert.strictEqual(loginName, "loginName", "loginName should be equal");
      assert.strictEqual(
        displayName,
        "displayName",
        "displayName should be equal"
      );
      assert.strictEqual(email, "a@a.com", "email should be equal");
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

    it("should not create admin user if users exist", async () => {
      const { errors = [] } = await sdk.createFirstUser({
        input: {
          loginName: "loginName2",
          displayName: "displayName2",
          email: "a2@a.com",
          password: "password"
        }
      });
      assert.isAtLeast(errors.length, 1, "errors should exist");
    });
  });

  describe("#user()", () => {
    it("should query user by loginName", async () => {
      const { data, errors } = await sdk.user({
        input: {
          loginName: "loginName"
        }
      });
      assert.notExists(errors, "errors should not exist");
      const { loginName, displayName, roles = [] } = data?.user ?? {};
      assert.strictEqual(loginName, "loginName", "loginName should be equal");
      assert.strictEqual(
        displayName,
        "displayName",
        "displayName should be equal"
      );
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
    it("should query users", async () => {
      const { data, errors } = await sdk.users({
        pagination: {
          skip: 0,
          take: 10
        }
      });
      assert.notExists(errors, "errors should not exist");
      const { count, edges = [] } = data?.users ?? {};
      assert.strictEqual(count, 1);
      const { loginName, displayName, roles = [] } = edges[0];
      assert.strictEqual(loginName, "loginName", "loginName should be equal");
      assert.strictEqual(
        displayName,
        "displayName",
        "displayName should be equal"
      );
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

  describe("#login()", () => {
    it("should login with loginName and password", async () => {
      const { data, errors } = await sdk.login({
        input: {
          loginName: "loginName",
          password: "password"
        }
      });
      const { loginName, displayName, email, roles = [] } = data?.login ?? {};
      assert.notExists(errors, "errors should not exist");
      assert.strictEqual(loginName, "loginName", "loginName should be equal");
      assert.strictEqual(
        displayName,
        "displayName",
        "displayName should be equal"
      );
      assert.strictEqual(email, "a@a.com", "email should be equal");
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
    it("should query self by login cookie", async () => {
      const result = await sdk.login({
        input: {
          loginName: "loginName",
          password: "password"
        }
      });
      const extensions: any = result?.extensions;
      const extRes: ExtResponse = extensions.response;
      const cookies = mapCookies(extRes.cookies);
      const { data, errors } = await sdk.me({}, { cookies });
      const { loginName, displayName, email, roles = [] } = data?.me ?? {};
      assert.notExists(errors, "errors should not exist");
      assert.strictEqual(loginName, "loginName", "loginName should be equal");
      assert.strictEqual(
        displayName,
        "displayName",
        "displayName should be equal"
      );
      assert.strictEqual(email, "a@a.com", "email should be equal");
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

  after(async () => {
    await app.close();
  });
});
