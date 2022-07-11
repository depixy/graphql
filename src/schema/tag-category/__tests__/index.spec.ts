import { assert } from "chai";
import {
  getApiSdk,
  initFastify,
  mapCookies,
  Order
} from "@depixy/graphql/schema/test";

import type { FastifyInstance } from "fastify";
import type { ApiSdk, ExtResponse } from "@depixy/graphql/schema/test";

describe("tagCategory", () => {
  let app: FastifyInstance;
  let sdk: ApiSdk;
  let cookies: ReturnType<typeof mapCookies> = {};

  before(async () => {
    app = await initFastify();
    sdk = getApiSdk(app);

    await sdk.createUser({
      input: {
        loginName: "admin",
        displayName: "Admin",
        email: "admin@example.com",
        password: "password"
      }
    });

    const loginResult = await sdk.login({
      input: {
        loginName: "admin",
        password: "password"
      }
    });

    const extensions: any = loginResult?.extensions;
    const extRes: ExtResponse = extensions.response;
    cookies = mapCookies(extRes.cookies);
  });

  describe("#createTagCategory()", () => {
    it("should create", async () => {
      const { data, errors } = await sdk.createTagCategory(
        {
          input: {
            name: "TagCategory",
            slug: "tag-category"
          }
        },
        { cookies }
      );
      assert.notExists(errors, "errors should not exist");
      const { name, slug } = data?.createTagCategory ?? {};
      assert.strictEqual(name, "TagCategory", "name should be equal");
      assert.strictEqual(slug, "tag-category", "slug should be equal");
    });

    it("should not create with name", async () => {
      const { errors = [] } = await sdk.createTagCategory(
        {
          input: {
            name: "TagCategory",
            slug: "tag-category-2"
          }
        },
        { cookies }
      );
      assert.isAtLeast(errors.length, 1, "errors should exist");
    });

    it("should not create with slug", async () => {
      const { errors = [] } = await sdk.createTagCategory(
        {
          input: {
            name: "TagCategory2",
            slug: "tag-category"
          }
        },
        { cookies }
      );
      assert.isAtLeast(errors.length, 1, "errors should exist");
    });
  });

  describe("#tagCategory()", () => {
    it("should query by name", async () => {
      const { data, errors } = await sdk.tagCategory({
        input: {
          name: "TagCategory"
        }
      });
      assert.notExists(errors, "errors should not exist");
      const { name, slug } = data?.tagCategory ?? {};
      assert.strictEqual(name, "TagCategory", "name should be equal");
      assert.strictEqual(slug, "tag-category", "slug should be equal");
    });

    it("should query by slug", async () => {
      const { data, errors } = await sdk.tagCategory({
        input: {
          slug: "tag-category"
        }
      });
      assert.notExists(errors, "errors should not exist");
      const { name, slug } = data?.tagCategory ?? {};
      assert.strictEqual(name, "TagCategory", "name should be equal");
      assert.strictEqual(slug, "tag-category", "slug should be equal");
    });
  });

  describe("#tagCategories()", () => {
    it("should query", async () => {
      const { data, errors } = await sdk.tagCategories(
        {
          pagination: { skip: 0, take: 10 },
          orderBy: [{ createdAt: Order.Asc }]
        },
        { cookies }
      );
      assert.notExists(errors, "errors should not exist");
      const { count, edges = [] } = data?.tagCategories ?? {};
      assert.strictEqual(count, 1);
      const { name, slug } = edges[0];
      assert.strictEqual(name, "TagCategory", "name should be equal");
      assert.strictEqual(slug, "tag-category", "slug should be equal");
    });
  });

  describe("#updateTagCategory()", () => {
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

      const tagCategoryResult = await sdk.tagCategory({
        input: {
          name: "TagCategory"
        }
      });
      const { data, errors } = await sdk.updateTagCategory(
        {
          input: {
            id: tagCategoryResult.data?.tagCategory?.id ?? "",
            name: "TagCategory2"
          }
        },
        { cookies }
      );
      assert.notExists(errors, "errors should not exist");
      const { name, slug } = data?.updateTagCategory ?? {};
      assert.strictEqual(name, "TagCategory2", "name should be equal");
      assert.strictEqual(slug, "tag-category", "slug should be equal");
    });
  });

  describe("#removeTagCategories()", () => {
    it("should remove by name", async () => {
      const { data, errors } = await sdk.removeTagCategories(
        {
          input: {
            name: { equal: "TagCategory2" }
          }
        },
        { cookies }
      );
      const { count } = data?.removeTagCategories ?? {};
      assert.notExists(errors, "errors should not exist");
      assert.strictEqual(count, 1, "count should be equal");
    });
  });

  after(async () => {
    await sdk.removeTagCategories({ input: {} }, { cookies });
    await sdk.removeUsers({ input: {} }, { cookies });
    await app.close();
  });
});
