import type { FastifyInstance } from "fastify";

/** Liveness probe. A route file is a plugin — that is the whole convention. */
export async function healthRoutes(app: FastifyInstance) {
  app.get(
    "/healthz",
    {
      schema: {
        response: {
          200: {
            type: "object",
            properties: { status: { type: "string" } },
            required: ["status"],
          },
        },
      },
    },
    async () => ({ status: "ok" }),
  );
}
