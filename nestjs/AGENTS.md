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

```sh templetry:checks
npm install
npm run build
npm test
npm run test:e2e
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
