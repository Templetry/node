import { resolve } from "node:path";
import { expect, test } from "vitest";
import { loadConfig } from "./config.js";

// The profiles live at the project root, one level above this file.
const root = resolve(import.meta.dirname, "..");

test.each(["development", "staging", "production"])("%s declares its own name", (profile) => {
  expect(loadConfig(profile, root).environment).toBe(profile);
});

test("development keeps detail on and caching off", () => {
  const config = loadConfig("development", root);
  expect(config.verboseErrors).toBe(true);
  expect(config.cacheSeconds).toBe(0);
});

test("production turns detail off and caches longest", () => {
  const config = loadConfig("production", root);
  expect(config.verboseErrors).toBe(false);
  expect(config.cacheSeconds).toBe(300);
});

test("staging differs from both neighbours", () => {
  // Staging exists to be production-like while still debuggable, so it is
  // the one profile whose values must not equal either neighbour's.
  const config = loadConfig("staging", root);
  expect(config.verboseErrors).toBe(true);
  expect(config.cacheSeconds).toBe(30);
});

test("an unknown profile fails loudly", () => {
  expect(() => loadConfig("qa", root)).toThrow(/ENVIRONMENT is missing/);
});
