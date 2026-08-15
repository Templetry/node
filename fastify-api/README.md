# TemplateApp

Fastify API in TypeScript: routes are plugins, and every route declares a JSON Schema that Fastify **enforces** — requests that do not fit are rejected before the handler runs, and replies are serialized through the response schema.

## Run

```sh
npm install
npm run dev        # tsx watch, reloads on change
```

```sh
npm run build && npm start
```

## Test

```sh
npm test
```

Tests use `app.inject()`, which drives the full request lifecycle without opening a socket — as fast as unit tests, as honest as integration ones.

## Layout

```
src/
  app.ts              buildApp(): registers plugins and routes
  server.ts           the only file that binds a port
  routes/
    health.ts         /healthz
    hello.ts          /api/hello/:name — schema validation in practice
```

## Adding a route

Write a plugin and register it in `buildApp`:

```ts
export async function thingRoutes(app: FastifyInstance) {
  app.get("/things", { schema: { /* … */ } }, async () => []);
}
```

Give it a `response` schema even when it feels redundant. Fastify serializes through it, so a field you forgot to remove from an object never leaks to a client — and it is roughly twice as fast as `JSON.stringify`.

## Notes

- **`npm test` passes with no test files** (`--passWithNoTests`), so the command means the same thing whichever features are on.
- Errors from schema validation come back as `400` with a message naming the offending field; override with `setErrorHandler` if you need a different shape.
