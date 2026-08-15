import type { FastifyInstance } from "fastify";
// tpl:if environments
import { config } from "../config.js";
// tpl:endif

/** Liveness probe. A route file is a plugin — that is the whole convention. */
export async function healthRoutes(app: FastifyInstance) {
  app.get(
    "/healthz",
    {
      schema: {
        response: {
          200: {
            type: "object",
            // `environment` is optional in the schema so the same route
            // serves both feature combinations without a directive here.
            properties: { status: { type: "string" }, environment: { type: "string" } },
            required: ["status"],
          },
        },
      },
    },
    async () => ({
      status: "ok",
      // tpl:if environments
      environment: config.environment,
      // tpl:endif
    }),
  );
}
