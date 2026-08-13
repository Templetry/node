import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { afterAll, beforeAll, expect, test } from "vitest";
import { app } from "./app.js";

const server = createServer(app);
let base = "";

beforeAll(async () => {
  await new Promise<void>((resolve) => server.listen(0, resolve));
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

afterAll(() => new Promise<void>((resolve) => void server.close(() => resolve())));

test("healthz responds ok", async () => {
  const res = await fetch(`${base}/healthz`);
  expect(res.status).toBe(200);
  expect(await res.json()).toEqual({ status: "ok" });
});

test("hello greets by name", async () => {
  const res = await fetch(`${base}/api/hello/Node`);
  expect(res.status).toBe(200);
  expect(await res.json()).toEqual({ message: "Hello, Node!" });
});
