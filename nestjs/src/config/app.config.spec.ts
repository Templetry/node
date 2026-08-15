import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { envFilePaths, validateConfig } from "./app.config";

/** Reads a profile file the way ConfigModule would, without booting Nest. */
function profile(name: string): Record<string, string> {
  const text = readFileSync(resolve(process.cwd(), `.env.${name}`), "utf8");
  const out: Record<string, string> = {};
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq > 0) out[trimmed.slice(0, eq)] = trimmed.slice(eq + 1);
  }
  return out;
}

describe("environment profiles", () => {
  it.each(["development", "staging", "production"])("%s declares its own name", (name) => {
    expect(validateConfig(profile(name)).ENVIRONMENT).toBe(name);
  });

  it("development keeps detail on and caching off", () => {
    const config = validateConfig(profile("development"));
    expect(config.VERBOSE_ERRORS).toBe(true);
    expect(config.CACHE_SECONDS).toBe(0);
  });

  it("production turns detail off and caches longest", () => {
    const config = validateConfig(profile("production"));
    expect(config.VERBOSE_ERRORS).toBe(false);
    expect(config.CACHE_SECONDS).toBe(300);
  });

  it("staging differs from both neighbours", () => {
    // Staging exists to be production-like while still debuggable, so it is
    // the one profile whose values must not equal either neighbour's.
    const config = validateConfig(profile("staging"));
    expect(config.VERBOSE_ERRORS).toBe(true);
    expect(config.CACHE_SECONDS).toBe(30);
  });

  it("rejects a profile that makes no sense", () => {
    expect(() => validateConfig({ ...profile("production"), CACHE_SECONDS: "-1" })).toThrow(
      /invalid environment profile/,
    );
  });

  it("APP_ENV selects the file, and .env.local layers on top", () => {
    expect(envFilePaths("staging")).toEqual([".env.local", ".env.staging"]);
  });
});
