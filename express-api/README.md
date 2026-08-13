# TemplateApp

Express API generated with [Templetry](https://github.com/Templetry): TypeScript (NodeNext), health endpoint, Vitest against a real server, optional Dockerfile.

```sh
npm install
npm run dev        # tsx watch on :3000 (PORT overrides)
npm run build && npm start
npm test           # vitest feature
docker build -t template-app .   # docker feature
```

Routes: `GET /healthz` · `GET /api/hello/:name`.
