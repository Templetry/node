# AGENTS

Operating contract for AI agents and automation helpers working in this project.

## Mission

- Keep this API lean: Fastify 5 + TypeScript, no ORM or framework layers until the app actually needs them.

## Core Rules

- A route module is a **plugin**: an `async (app: FastifyInstance)` function registered in `buildApp`. `src/server.ts` stays a thin shell that binds a port.
- **Every route declares a schema**, including a `response` schema. Fastify validates requests against it and serializes replies through it — this is the reason to use Fastify, not decoration.
- Never widen a schema to make a request pass. If a request should be accepted, say so in the schema deliberately.
- Strict TypeScript stays on; NodeNext imports use the `.js` extension.
- Every route gets a test in `src/app.test.ts` using `app.inject()` — no sockets, no mocks.
- Update docs in the same change when behavior or process changes.

## Required Checks Before Finishing

- `npm run build` compiles clean.
- `npm test` passes.

## Safe Change Workflow

1. Read the affected files fully before editing.
2. Make the smallest change that solves the task.
3. Build and test, then review the diff with git before committing.
