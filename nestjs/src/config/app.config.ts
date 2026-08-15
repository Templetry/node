import { plainToInstance } from "class-transformer";
import { IsBoolean, IsIn, IsInt, IsString, Max, Min, validateSync } from "class-validator";

export const ENVIRONMENTS = ["development", "staging", "production"] as const;
export type Environment = (typeof ENVIRONMENTS)[number];

/**
 * The settings this application reads, validated when the module loads.
 *
 * A profile with a nonsensical value stops the process at startup instead of
 * failing on the request that first needed it.
 */
export class AppConfig {
  @IsIn(ENVIRONMENTS)
  ENVIRONMENT!: Environment;

  @IsString()
  LOG_LEVEL!: string;

  @IsBoolean()
  VERBOSE_ERRORS!: boolean;

  @IsInt()
  @Min(0)
  @Max(86_400)
  CACHE_SECONDS!: number;
}

/** ConfigModule's `validate` hook: coerce, check, and fail loudly. */
export function validateConfig(raw: Record<string, unknown>): AppConfig {
  const config = plainToInstance(AppConfig, {
    ...raw,
    VERBOSE_ERRORS: String(raw.VERBOSE_ERRORS) === "true",
    CACHE_SECONDS: Number(raw.CACHE_SECONDS),
  });

  const errors = validateSync(config, { skipMissingProperties: false });
  if (errors.length > 0) {
    throw new Error(`invalid environment profile: ${errors.join("\n")}`);
  }
  return config;
}

/** The profile files ConfigModule should read, most specific first. */
export function envFilePaths(profile = process.env.APP_ENV ?? "development"): string[] {
  // .env.local is gitignored and layers on top; real environment variables
  // still win over both, which is what lets a container ship without files.
  return [".env.local", `.env.${profile}`];
}
