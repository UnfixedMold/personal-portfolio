# Proposal

## Why

Nothing checks a pull request and nothing builds what runs in production. A broken change can merge, and every deploy is a manual build.

## What Changes

- Add a production Dockerfile that runs the Next.js standalone server.
- Add a GitHub Actions workflow with a `Check` job on every pull request, every push to `main` and on manual dispatch.
- `Check` runs the Prettier check, lint, typecheck, unit tests, end-to-end tests and the build.
- Upload the Playwright report when `Check` fails.
- Publish the image to GHCR after `Check` passes on `main`, tagged `latest` and `sha-<short sha>`.
- Trigger the deploy workflow in a separate deploy repo with the `sha-` tag after the image is published.
- Skip the deploy trigger until the deploy repo is configured, so `main` stays green before it exists.
- Make `Check` a required status check on `main` again.

## Capabilities

### New Capabilities

- `delivery-pipeline`: what CI checks on a pull request and on `main`, which image it publishes and how it hands off to the deploy.

### Modified Capabilities

None.

## Impact

- New: `Dockerfile`, `.dockerignore` and `.github/workflows/ci.yml`.
- Changed: `next.config.ts` gets `output: 'standalone'`.
- Changed: the ruleset in `.github/rulesets/main.json`, the `/git-merge-pr` guards, `.claude/rules/git.md`, `CLAUDE.md` and `README.md` name the required `Check` job.
- New GHCR package: `ghcr.io/unfixedmold/protfolio`.
- Manual setup: create the deploy repo with a `deploy.yml` workflow, then set the `DEPLOY_REPO` variable and the `DEPLOY_REPO_TOKEN` secret here.
- Manual setup: apply the updated ruleset to the GitHub repo.
- Branch: `add-ci-cd-pipeline`, off `main`.
