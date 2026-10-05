# Design

## Context

- The repo had no workflow and no Dockerfile. The old `Check` workflow was removed in `b497a30`.
- The site runs on the owner's server behind Caddy, with Grafana and Loki for logs.
- Node is pinned to `26.10.0` in the devcontainer and pnpm to `12.6.0` in `package.json`.
- `pnpm format` runs `prettier --write`, so it cannot fail in CI.
- Playwright starts its own `next dev` server from `playwright.config.ts`.
- The web-store project already deploys this way: GHCR image, then `gh workflow run deploy.yml` in a deploy repo.

## Goals / Non-Goals

**Goals:**

- One workflow file that checks, publishes and hands off.
- An image small enough to pull fast, with no dev dependencies.

**Non-Goals:**

- The deploy repo and its `deploy.yml`. That is a separate repo, set up by the owner.
- Preview images for pull requests.
- Multi-arch images. The server is `linux/amd64`.
- A required status check on `main`. The ruleset keeps only the pull request rules.

## Decisions

### One workflow, three jobs

- `.github/workflows/ci.yml` with `check`, `publish` and `deploy`, in that order through `needs`.
- Job names are `Check`, `Publish image` and `Trigger deploy`.
- A new run cancels the previous one on the same pull request, but never on `main`.
- Alternative: a separate publish workflow on `workflow_run`. Rejected, because it splits one pipeline over two files and loses `needs`.

### Check runs the real checks

- Steps: `pnpm i --frozen-lockfile`, install Chromium, `prettier --check .`, `pnpm lint`, `next typegen` and `pnpm typecheck`, `pnpm test`, `pnpm test:e2e`.
- `next typegen` writes the gitignored `next-env.d.ts` without a dev server or build.
- The production build is not a `Check` step. It runs inside the image build in `publish`.
- A `mailpit` service runs on the job, with `SMTP_HOST=localhost` and `MAILPIT_URL=http://localhost:8025`, for the contact form journeys.
- On failure, `actions/upload-artifact@v4` uploads `playwright-report` for 7 days. The Playwright reporter stays `list`, so the folder only exists if a reporter writes it.
- Node comes from `actions/setup-node@v5` with `cache: pnpm`. pnpm comes from `pnpm/action-setup@v4`, which reads `packageManager`.

### Standalone image

- `next.config.ts` sets `output: 'standalone'`.
- Multi-stage `Dockerfile` on `node:26.10.0-slim`: `deps` installs with the frozen lockfile and `--ignore-scripts`, `builder` runs `pnpm build`, `runner` copies `.next/standalone`, `.next/static`, `public` and `assets/fonts`.
- `assets/fonts` is copied because the brand image reads its font from disk at runtime.
- The runner sets `NODE_ENV=production`, `PORT=3000` and `HOSTNAME=0.0.0.0`, runs as a `nextjs` system user and starts with `node server.js`.
- pnpm installs with `npm i -g pnpm@12.6.0`, since Corepack no longer ships with Node.
- `.dockerignore` excludes `node_modules`, `.next`, `.git`, `.env*`, tests, test output, `openspec`, `.claude` and other tooling folders.
- Alternative: `next start` with full `node_modules`. Rejected, because the image is several times larger.

### Publish like the web-store

- `docker/setup-buildx-action@v3`, `docker/login-action@v3` with `GITHUB_TOKEN`, `docker/metadata-action@v5` and `docker/build-push-action@v6`.
- `publish` runs only when `github.event_name != 'pull_request'`.
- Tags: `type=raw,value=latest` and `type=sha,format=short`, which gives `sha-<7 chars>`.
- Cache: `type=gha,mode=max`.
- Permissions on the job: `contents: read`, `packages: write`.
- The image name comes from `${{ github.repository }}`, lowercased to `unfixedmold/personal-portfolio`.

### Deploy trigger names the repo

- `deploy` runs only on `refs/heads/main`, after `publish`.
- It runs `gh workflow run deploy.yml --repo UnfixedMold/personal-portfolio-deploy --ref main` with `name` and `tag` fields.
- `name` is `portfolio: <commit subject> (<short sha>)` and `tag` is `sha-<short sha>`.
- The token is the `DEPLOY_REPO_TOKEN` secret: a fine-grained token with Actions write on the deploy repo only.
- The repo is hardcoded, because the deploy repo exists and a variable adds nothing.

## Risks / Trade-offs

- [`Check` is not a required status check] → A pull request can merge with `Check` red. The owner reviews the run before merging.
- [The production build only runs on `main`] → A pull request that breaks the build passes `Check` and fails in `publish` after the merge.
- [The standalone trace misses a file the server reads at runtime] → The fonts copy covers the known case. The smoke test loads the home page and its assets.
- [`latest` moves on every main push] → The deploy uses the `sha-` tag, so `latest` is only a convenience.

## Migration Plan

- Merge the branch. The first `main` run publishes the image and triggers the deploy.
- Rollback: redeploy an older `sha-` tag from the deploy repo.
