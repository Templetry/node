import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Node has no blessed mechanism for environment profiles, so the convention
 * is: one `.env.<profile>` at the project root, selected by `APP_ENV`, read
 * through this module. Nothing else should touch `process.env`.
 */
export const ENVIRONMENTS = ["development", "staging", "production"] as const;
export type Environment = (typeof ENVIRONMENTS)[number];

export type Config = {
  environment: Environment;
  logLevel: string;
  verboseErrors: boolean;
  cacheSeconds: number;
};

/**
 * Parses KEY=VALUE lines. Deliberately not `process.loadEnvFile`: that
 * mutates `process.env` for the whole process, which makes loading two
 * profiles in one test run impossible.
 */
function parseEnvFile(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const value = trimmed.slice(eq + 1).trim();
    out[trimmed.slice(0, eq).trim()] = value.replace(/^["']|["']$/g, "");
  }
  return out;
}

function required(values: Record<string, string>, key: string): string {
  const value = values[key];
  if (value === undefined || value === "") {
    throw new Error(`config: ${key} is missing from the active profile`);
  }
  return value;
}

/**
 * Loads a profile by name, or the one `APP_ENV` selects. `.env.local` layers
 * on top when present and is gitignored; a real environment variable wins
 * over both, which is what lets a container ship without profile files.
 */
export function loadConfig(profile?: string, root = resolve(import.meta.dirname, "..")): Config {
  const name = profile ?? process.env.APP_ENV ?? "development";
  const values: Record<string, string> = {};
  for (const file of [`.env.${name}`, ".env.local"]) {
    const path = resolve(root, file);
    if (existsSync(path)) Object.assign(values, parseEnvFile(path));
  }
  Object.assign(values, filterKnown(process.env));

  const environment = required(values, "ENVIRONMENT");
  if (!ENVIRONMENTS.includes(environment as Environment)) {
    throw new Error(`config: unknown ENVIRONMENT "${environment}"`);
  }
  const cacheSeconds = Number(required(values, "CACHE_SECONDS"));
  if (!Number.isInteger(cacheSeconds) || cacheSeconds < 0) {
    throw new Error(`config: CACHE_SECONDS must be a non-negative integer`);
  }

  return {
    environment: environment as Environment,
    logLevel: required(values, "LOG_LEVEL"),
    verboseErrors: required(values, "VERBOSE_ERRORS") === "true",
    cacheSeconds,
  };
}

/** Only the keys a profile declares, so unrelated environment noise is ignored. */
function filterKnown(env: NodeJS.ProcessEnv): Record<string, string> {
  const keys = ["ENVIRONMENT", "LOG_LEVEL", "VERBOSE_ERRORS", "CACHE_SECONDS"];
  const out: Record<string, string> = {};
  for (const key of keys) {
    if (env[key] !== undefined) out[key] = env[key];
  }
  return out;
}

/** The active configuration, resolved once at import. */
export const config = loadConfig();
