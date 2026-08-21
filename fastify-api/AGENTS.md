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

```sh templetry:checks
npm install
npm run build
npm test
```

## Safe Change Workflow

1. Read the affected files fully before editing.
2. Make the smallest change that solves the task.
3. Build and test, then review the diff with git before committing.

## This project came from a template

Four facts you cannot infer from the code in front of you:

- **Never hand-edit `.templetry-answers.yml`.** It records what generated this project. Editing it makes the next update merge against a state that never existed.
- **Before writing a capability by hand, run `templetry pieces`.** Auth, RBAC, audit trails, API keys and whole CRUD resources may already exist as pieces for this template. Adopting one is `templetry add <name>`, and it brings its own tests.
- **`templetry update` pulls improvements from the template** through a three-way merge that keeps your edits. Use it instead of copying files from the template by hand.
- **Directives like `tpl:if` belong to the template, not here.** If you find one in this project, it is a rendering bug worth reporting — do not try to interpret it.
