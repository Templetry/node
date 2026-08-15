import type { FastifyInstance } from "fastify";
import { afterAll, beforeAll, expect, test } from "vitest";
import { buildApp } from "./app.js";

let app: FastifyInstance;

beforeAll(async () => {
  // inject() drives the whole request lifecycle without a socket, so the
  // tests are as fast as unit tests and as honest as integration ones.
  app = await buildApp({ logger: false });
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

test("healthz responds ok", async () => {
  const res = await app.inject({ method: "GET", url: "/healthz" });
  expect(res.statusCode).toBe(200);
  // The status is the contract; the payload may carry more (the active
  // environment, a build id) without that being a breaking change.
  expect(res.json().status).toBe("ok");
});

test("hello greets by name", async () => {
  const res = await app.inject({ method: "GET", url: "/api/hello/Fastify" });
  expect(res.statusCode).toBe(200);
  expect(res.json()).toEqual({ message: "Hello, Fastify!" });
});

test("the params schema rejects a name that is too long", async () => {
  const res = await app.inject({ method: "GET", url: `/api/hello/${"x".repeat(41)}` });
  expect(res.statusCode).toBe(400);
});
