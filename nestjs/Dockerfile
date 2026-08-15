# Build stage
FROM node:22-slim AS build
WORKDIR /src
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build && npm prune --omit=dev

# Runtime stage
FROM node:22-slim
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /src/dist ./dist
COPY --from=build /src/node_modules ./node_modules
COPY --from=build /src/package.json ./
EXPOSE 3000
CMD ["node", "dist/main"]
