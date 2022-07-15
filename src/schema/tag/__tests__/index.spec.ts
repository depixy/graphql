import { assert } from "chai";
import {
  getApiSdk,
  initFastify,
  mapCookies,
  Order
} from "@depixy/graphql/schema/test";

import type { FastifyInstance } from "fastify";
import type { ApiSdk, ExtResponse } from "@depixy/graphql/schema/test";

describe("tag", () => {
  let app: FastifyInstance;
  let sdk: ApiSdk;
  let cookies: ReturnType<typeof mapCookies> = {};
  let categoryId: string;

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

    const tagCategoryResult = await sdk.createTagCategory(
      {
        input: {
          name: "TagCategory",
          slug: "tag-category"
        }
      },
      { cookies }
    );

    categoryId = tagCategoryResult.data?.createTagCategory?.id ?? "";

    const extensions: any = loginResult?.extensions;
    const extRes: ExtResponse = extensions.response;
    cookies = mapCookies(extRes.cookies);
  });

  describe("#createTag()", () => {
    it("should create", async () => {
      const { data, errors } = await sdk.createTag(
        {
          input: {
            categoryId,
            name: "Tag",
            slug: "tag"
          }
        },
        { cookies }
      );
      assert.notExists(errors, "errors should not exist");
      const { name, slug, category } = data?.createTag ?? {};
      assert.strictEqual(name, "Tag", "name should be equal");
      assert.strictEqual(slug, "tag", "slug should be equal");
      assert.strictEqual(
        category?.name,
        "TagCategory",
        "category name should be equal"
      );
      assert.strictEqual(
        category?.slug,
        "tag-category",
        "category slug should be equal"
      );
    });

    it("should not create with name", async () => {
      const { errors = [] } = await sdk.createTag(
        {
          input: {
            categoryId,
            name: "Tag",
            slug: "tag-2"
          }
        },
        { cookies }
      );
      assert.isAtLeast(errors.length, 1, "errors should exist");
    });

    it("should not create with slug", async () => {
      const { errors = [] } = await sdk.createTag(
        {
          input: {
            categoryId,
            name: "Tag2",
            slug: "tag"
          }
        },
        { cookies }
      );
      assert.isAtLeast(errors.length, 1, "errors should exist");
    });
  });

  describe("#tag()", () => {
    it("should query by name", async () => {
      const { data, errors } = await sdk.tag({
        input: {
          name: "Tag"
        }
      });
      assert.notExists(errors, "errors should not exist");
      const { name, slug, category } = data?.tag ?? {};
      assert.strictEqual(name, "Tag", "name should be equal");
      assert.strictEqual(slug, "tag", "slug should be equal");
      assert.strictEqual(
        category?.name,
        "TagCategory",
        "category name should be equal"
      );
      assert.strictEqual(
        category?.slug,
        "tag-category",
        "category slug should be equal"
      );
    });

    it("should query by slug", async () => {
      const { data, errors } = await sdk.tag({
        input: {
          slug: "tag"
        }
      });
      assert.notExists(errors, "errors should not exist");
      const { name, slug, category } = data?.tag ?? {};
      assert.strictEqual(name, "Tag", "name should be equal");
      assert.strictEqual(slug, "tag", "slug should be equal");
      assert.strictEqual(
        category?.name,
        "TagCategory",
        "category name should be equal"
      );
      assert.strictEqual(
        category?.slug,
        "tag-category",
        "category slug should be equal"
      );
    });
  });

  describe("#tags()", () => {
    it("should query", async () => {
      const { data, errors } = await sdk.tags(
        {
          pagination: { skip: 0, take: 10 },
          orderBy: [{ createdAt: Order.Asc }]
        },
        { cookies }
      );
      assert.notExists(errors, "errors should not exist");
      const { count, edges = [] } = data?.tags ?? {};
      assert.strictEqual(count, 1);
      const { name, slug, category } = edges[0];
      assert.strictEqual(name, "Tag", "name should be equal");
      assert.strictEqual(slug, "tag", "slug should be equal");
      assert.strictEqual(
        category?.name,
        "TagCategory",
        "category name should be equal"
      );
      assert.strictEqual(
        category?.slug,
        "tag-category",
        "category slug should be equal"
      );
    });
  });

  describe("#updateTag()", () => {
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

      const tagResult = await sdk.tag({
        input: {
          name: "Tag"
        }
      });
      const { data, errors } = await sdk.updateTag(
        {
          input: {
            id: tagResult.data?.tag?.id ?? "",
            name: "Tag2"
          }
        },
        { cookies }
      );
      assert.notExists(errors, "errors should not exist");
      const { name, slug, category } = data?.updateTag ?? {};
      assert.strictEqual(name, "Tag2", "name should be equal");
      assert.strictEqual(slug, "tag", "slug should be equal");
      assert.strictEqual(
        category?.name,
        "TagCategory",
        "category name should be equal"
      );
      assert.strictEqual(
        category?.slug,
        "tag-category",
        "category slug should be equal"
      );
    });
  });

  describe("#removeTagCategories()", () => {
    it("should remove by name", async () => {
      const { data, errors } = await sdk.removeTagCategories(
        {
          input: {
            name: { equal: "Tag2" }
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
