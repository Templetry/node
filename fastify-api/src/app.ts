import Fastify, { type FastifyInstance, type FastifyServerOptions } from "fastify";
import { healthRoutes } from "./routes/health.js";
import { helloRoutes } from "./routes/hello.js";
// tpl:if openapi
import { openapi } from "./plugins/openapi.js";
// tpl:endif

/**
 * Builds the TemplateApp server.
 *
 * Separate from server.ts on purpose: tests build an instance and call
 * `inject()` against it, so nothing ever binds a port.
 */
export async function buildApp(opts: FastifyServerOptions = {}): Promise<FastifyInstance> {
  const app = Fastify({ logger: true, ...opts });

  // tpl:if openapi
  await app.register(openapi);
  // tpl:endif

  await app.register(healthRoutes);
  await app.register(helloRoutes, { prefix: "/api" });

  return app;
}
