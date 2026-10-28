# --- build stage: produce the static Vite build ---
FROM node:24-alpine AS build
WORKDIR /app

# Install deps first so this layer is cached unless package.json/lockfile change.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- runtime stage: serve the static files with nginx ---
FROM nginx:1.29-alpine

# Only the built assets are carried over from the build stage; no Node in the final image.
COPY --from=build /app/dist /usr/share/nginx/html

# --- Runtime configuration setup ---
COPY config.template.js /usr/share/nginx/html/config.template.js
COPY docker-entrypoint.d/40-env-config.sh /docker-entrypoint.d/40-env-config.sh
RUN chmod +x /docker-entrypoint.d/40-env-config.sh

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80