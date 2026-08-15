import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import type { FastifyInstance } from "fastify";

/**
 * OpenAPI costs almost nothing here: the route schemas already describe the
 * API, so this only exposes them. Register it before the routes — anything
 * registered afterwards is not in the document.
 *
 * This plugin also *augments* `FastifySchema` with the documentation fields
 * (`description`, `summary`, `tags`, `operationId`). They are only valid
 * while it is installed, which is why the route schemas here carry none: a
 * project that drops this plugin would otherwise stop compiling. Add them
 * freely as long as you keep the plugin.
 */
export async function openapi(app: FastifyInstance) {
  await app.register(swagger, {
    openapi: {
      info: {
        title: "TemplateApp",
        description: "TemplateApp HTTP API",
        version: "0.1.0",
      },
    },
  });
  await app.register(swaggerUi, { routePrefix: "/docs" });
}
