import type { FastifyInstance } from "fastify";

/**
 * The schema is not documentation: Fastify validates the request against it
 * and rejects what does not fit before the handler runs, then serializes the
 * reply through the response schema — so a field the schema does not declare
 * never reaches a client.
 */
export async function helloRoutes(app: FastifyInstance) {
  app.get<{ Params: { name: string } }>(
    "/hello/:name",
    {
      schema: {
        params: {
          type: "object",
          properties: { name: { type: "string", minLength: 1, maxLength: 40 } },
          required: ["name"],
        },
        response: {
          200: {
            type: "object",
            properties: { message: { type: "string" } },
            required: ["message"],
          },
        },
      },
    },
    async (req) => ({ message: `Hello, ${req.params.name}!` }),
  );
}
