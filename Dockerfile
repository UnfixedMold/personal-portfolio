# syntax=docker/dockerfile:1

FROM node:26.10.0-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm install -g pnpm@12.6.0

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# --ignore-scripts skips `prepare`, which wires git hooks and needs git
RUN pnpm i --frozen-lockfile --ignore-scripts

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build && mkdir -p public

FROM node:26.10.0-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  PORT=3000 \
  HOSTNAME=0.0.0.0

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# lib/brand-image.ts reads the font from process.cwd() at runtime
COPY --from=builder --chown=nextjs:nodejs /app/assets/fonts ./assets/fonts

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
