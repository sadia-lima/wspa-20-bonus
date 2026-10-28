# --- build stage: compile TypeScript to JS ---
FROM node:24-alpine AS build
WORKDIR /app

# Install deps first so this layer is cached unless package.json/lockfile change.
COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# --- runtime stage: only what's needed to run the compiled server ---
FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production

# Reinstall with dev deps omitted, so tsx/typescript/biome etc. don't end up in the image.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Only the compiled output is carried over from the build stage.
COPY --from=build /app/dist ./dist

EXPOSE 3001
CMD ["node", "dist/server.js"]
