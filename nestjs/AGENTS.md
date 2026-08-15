# AGENTS

Operating contract for AI agents and automation helpers working in this project.

## Mission

- Keep this a plain NestJS service: feature modules, DI, no ORM or extra layers until the app actually needs them.

## Core Rules

- **Controllers are about HTTP** — parameters in, status codes out. Behaviour lives in a service, which is what makes it unit-testable.
- A feature is a module with its own directory; register it in `AppModule` and nowhere else.
- Request bodies are DTO classes with `class-validator` decorators. Never accept `any` or read raw `@Body()` to sidestep validation.
- Never relax `whitelist` / `forbidNonWhitelisted` to make a request pass. If a property should be allowed, declare it on the DTO.
- Global pipes are configured in **both** `src/main.ts` and the e2e `beforeAll`. Change one, change the other — the test host does not run `main.ts`.
- Every provider gets a unit spec; every route gets an e2e expectation.
- Strict TypeScript stays on.
- Update docs in the same change when behavior or process changes.

## Required Checks Before Finishing

- `npm run build` compiles clean.
- `npm test` passes.
- `npm run test:e2e` passes.

## Safe Change Workflow

1. Read the affected files fully before editing.
2. Make the smallest change that solves the task.
3. Build and test, then review the diff with git before committing.
