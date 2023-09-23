# creación de un multi-state build
# etapa 1
FROM node:19.2-alpine3.16 AS deps
WORKDIR /app
COPY package.json ./
RUN npm install

# etapa 2
FROM node:19.2-alpine3.16 AS builder
WORKDIR /app
# --from: copiando todas las dependencias desde la etapa 1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run test

# etapa 3 (dejando solo dependencias de producción)
FROM node:19.2-alpine3.16 AS deps-prod
WORKDIR /app
COPY package.json ./
RUN npm install --prod

# etapa 4 y final
FROM node:19.2-alpine3.16 AS runner
WORKDIR /app
COPY --from=deps-prod /app/node_modules ./node_modules
COPY app.js ./
COPY tasks/ ./tasks
CMD ["node", "app.js"]