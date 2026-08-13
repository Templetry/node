# Templetry parent: node

Node.js templates for [Templetry](https://github.com/Templetry). One **parent repo**, multiple **forms** — each form is a subdirectory that compiles on its own and carries its own `template.yml` ([ADR-0011](https://github.com/Templetry/wiki/blob/main/adr/0011-template-forms.md)).

| Form | What it is | Status |
|---|---|---|
| [`express-api/`](express-api/) | Express API — TypeScript (NodeNext), Vitest, optional Dockerfile, presets `full`/`minimal` | ✅ ready |

## Usage

```sh
templetry init node/express-api --out ./my-api --set "project_name=My Api" --preset full
```

Forms are **chosen**, not combined. Inside a form, the manifest's features (and presets) are the combinable axis.
