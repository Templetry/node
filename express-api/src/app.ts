import express from "express";
// tpl:if environments
import { config } from "./config.js";
// tpl:endif

// TemplateApp API.
export const app = express();
app.use(express.json());

app.get("/healthz", (_req, res) => {
  // tpl:if environments
  res.json({ status: "ok", environment: config.environment });
  // tpl:endif
  // tpl:if !environments
  res.json({ status: "ok" });
  // tpl:endif
});

app.get("/api/hello/:name", (req, res) => {
  res.json({ message: `Hello, ${req.params.name}!` });
});
