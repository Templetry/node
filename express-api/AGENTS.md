# AGENTS

Operating contract for AI agents and automation helpers working in this project.

## Mission

- Keep this API lean: Express 5 + TypeScript, no ORM or framework layers until the app actually needs them.

## Core Rules

- Routes live in `src/app.ts` (or route modules it imports); `src/server.ts` stays a thin shell reading env config.
- Strict TypeScript stays on; NodeNext imports use the `.js` extension.
- Handlers return JSON; errors get proper status codes.
- Every route gets a test in `src/app.test.ts` (real server on an ephemeral port, no mocks).
- Update docs in the same change when behavior or process changes.

## Required Checks Before Finishing

- `npm run build` compiles clean.
- `npm test` passes when tests exist.

## Safe Change Workflow

1. Read the affected files fully before editing.
2. Make the smallest change that solves the task.
3. Build and test, then review the diff with git before committing.
