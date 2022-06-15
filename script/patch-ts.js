import { readFile, writeFile } from "fs/promises";

const packages = [
  "graphql-scalars",
  "@graphql-tools/schema",
  "@graphql-tools/merge",
  "@graphql-tools/utils"
];

for (const pkg of packages) {
  const path = `./node_modules/${pkg}/package.json`;
  const jsonStr = await readFile(path, { encoding: "utf-8" });
  const json = JSON.parse(jsonStr);

  const { exports = {} } = json;
  for (const key of Object.keys(exports)) {
    const ept = exports[key];
    if (typeof ept !== "object" || !ept || ept.types) {
      continue;
    }
    if (!ept.require || !ept.require.endsWith(".js")) {
      console.log(`Fail to patch ${pkg}:${key}`);
      continue;
    }
    ept.types = ept.require.replace(".js", ".d.ts");

    await writeFile(path, JSON.stringify(json, undefined, 2), {
      encoding: "utf-8"
    });
  }
}
