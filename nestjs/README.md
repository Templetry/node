# TemplateApp

NestJS service: feature modules, dependency injection, and DTOs whose decorators are enforced rather than documented.

## Run

```sh
npm install
npm run dev          # nest start --watch
```

```sh
npm run build && npm run start:prod
```

## Test

```sh
npm test             # unit suites next to the code
npm run test:e2e     # the whole app through HTTP
```

Both matter and they test different things. A unit suite builds one provider with `Test.createTestingModule`; the e2e suite boots `AppModule` and drives it with supertest, which is the only place routing, pipes and the module graph are actually exercised.

## Layout

```
src/
  main.ts                bootstrap and global pipes
  app.module.ts          the root module: wiring only
  health/                a controller with no module of its own
  hello/
    hello.module.ts
    hello.controller.ts  HTTP only
    hello.service.ts     the behaviour
    dto/greet.dto.ts     the request contract
test/
  app.e2e-spec.ts
```

## Adding a feature

Generate or write a module, then import it in `AppModule`:

```sh
npx nest generate module things
npx nest generate controller things
npx nest generate service things
```

Keep controllers about HTTP — parameters in, status codes out — and put the behaviour in a service. That split is what makes the unit tests worth writing.

## Validation

`POST /api/hello` takes a `GreetDto`. The global `ValidationPipe` runs with `whitelist` and `forbidNonWhitelisted`, so a body carrying a property the DTO does not declare is a **400**, not a silently ignored field. That difference is the reason to configure it explicitly.

The pipe is set up in two places on purpose: `main.ts` for the real process, and the e2e test's `beforeAll`, because the test host never runs `main.ts`. If you change one, change the other or the suite stops testing the app that ships.
