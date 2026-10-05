# Design

## Context

- The repo has no workflow and no Dockerfile. The old `Check` workflow was removed in `b497a30`.
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

## Decisions

### One workflow, three jobs

- `.github/workflows/ci.yml` with `check`, `publish` and `deploy`, in that order through `needs`.
- `publish` and `deploy` run only when `github.event_name != 'pull_request'`.
- Job names are `Check`, `Publish image` and `Trigger deploy`. The ruleset matches on `Check`.
- Alternative: a separate publish workflow on `workflow_run`. Rejected, because it splits one pipeline over two files and loses `needs`.

### Check runs the real checks

- Steps: `pnpm i --frozen`, `pnpm exec prettier --check .`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, install Chromium, `pnpm test:e2e`, `pnpm build`.
- Prettier runs directly with `--check` instead of through `pnpm format`. No new `format:check` script.
- Chromium installs with `pnpm exec playwright install --with-deps chromium`.
- On failure, `actions/upload-artifact@v4` uploads `playwright-report` for 7 days.
- The Playwright `reporter` becomes `[['list'], ['html', { open: 'never' }]]`, so the report exists to upload.
- Node comes from `actions/setup-node@v4` with `node-version: '26.10.0'` and `cache: pnpm`. pnpm comes from `pnpm/action-setup@v4`, which reads `packageManager`.

### Standalone image

- `next.config.ts` sets `output: 'standalone'`, as `03-api-reference/05-config/01-next-config-js/output.md` describes.
- Multi-stage `Dockerfile` on `node:26.10.0-slim`: `deps` installs with the frozen lockfile, `build` runs `pnpm build`, `runner` copies only `.next/standalone`, `.next/static` and `public`.
- The runner sets `NODE_ENV=production`, `PORT=3000` and `HOSTNAME=0.0.0.0`, runs as the `node` user and starts with `node server.js`.
- pnpm installs in the build stages with `npm i -g pnpm@12.6.0`, since Corepack no longer ships with Node.
- `.dockerignore` excludes `node_modules`, `.next`, `.git`, `.env*`, test output and the `openspec` and `.claude` folders.
- Alternative: `next start` with full `node_modules`. Rejected, because the image is several times larger.

### Publish like the web-store

- `docker/setup-buildx-action@v3`, `docker/login-action@v3` with `GITHUB_TOKEN`, `docker/metadata-action@v5` and `docker/build-push-action@v6`.
- Tags: `type=raw,value=latest` and `type=sha,format=short`, which gives `sha-<7 chars>`.
- Cache: `type=gha,mode=max`.
- Permissions on the job: `contents: read`, `packages: write`.
- The image name comes from `${{ github.repository }}`, which `metadata-action` lowercases to `unfixedmold/protfolio`.

### Deploy trigger waits for a variable

- `deploy` runs `gh workflow run deploy.yml --repo "$DEPLOY_REPO" --ref main --field name=... --field tag=sha-<short sha>`, as in the web-store.
- The job has `if: vars.DEPLOY_REPO != ''`, so it is skipped until the owner sets the repo variable.
- The token is the `DEPLOY_REPO_TOKEN` secret: a fine-grained token with Actions write on the deploy repo only.
- The `deploy.yml` contract is two string inputs, `name` and `tag`.
- Alternative: hardcode the deploy repo. Rejected, because the repo does not exist yet and every `main` run would fail.

### Check is required again

- `.github/rulesets/main.json` gets back the `required_status_checks` rule for `Check` with `integration_id` 15368, the GitHub Actions app.
- `/git-merge-pr` gets back its "`Check` is green on HEAD" guard.
- `.claude/rules/git.md`, `CLAUDE.md` and `README.md` say again that `main` moves only after `Check` passed.

## Risks / Trade-offs

- [`deliver-contact-form` lands and its journeys need Mailpit] → Whichever change lands second adds a `mailpit` service to `Check` and sets `SMTP_HOST=localhost` on the job, since a runner reaches service containers on localhost.
- [The standalone trace misses a file the server reads at runtime] → The image smoke test in tasks loads the home page and its assets before the first publish.
- [The ruleset change blocks a merge while CI is broken] → The owner can still disable the rule in GitHub settings. The bypass list stays empty.
- [`latest` moves on every main push] → The deploy uses the `sha-` tag, so `latest` is only a convenience.

## Migration Plan

- Merge the branch. The first `main` run publishes the first image and skips the deploy.
- The owner creates the deploy repo, sets `DEPLOY_REPO` and `DEPLOY_REPO_TOKEN`, then reruns the workflow to test the trigger.
- The owner applies the ruleset with `gh api -X PUT repos/UnfixedMold/protfolio/rulesets/<id> --input .github/rulesets/main.json`.
- Rollback: redeploy an older `sha-` tag from the deploy repo.

## Open Questions

- The deploy repo name. The pattern from the web-store suggests `UnfixedMold/protfolio-deploy`; it only changes the variable value.
