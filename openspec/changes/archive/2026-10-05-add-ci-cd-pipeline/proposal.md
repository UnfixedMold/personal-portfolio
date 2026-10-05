# Proposal

## Why

Nothing checks a pull request and nothing builds what runs in production. A broken change can merge, and every deploy is a manual build.

## What Changes

- Add a production Dockerfile that runs the Next.js standalone server.
- Add a GitHub Actions workflow with a `Check` job on every pull request, every push to `main` and on manual dispatch.
- `Check` runs the Prettier check, lint, typecheck, unit tests and end-to-end tests against a Mailpit service.
- Upload the Playwright report folder when `Check` fails.
- Publish the image to GHCR after `Check` passes on `main`, tagged `latest` and `sha-<short sha>`.
- Trigger the deploy workflow in `UnfixedMold/personal-portfolio-deploy` with the `sha-` tag after the image is published.

## Capabilities

### New Capabilities

- `delivery-pipeline`: what CI checks on a pull request and on `main`, which image it publishes and how it hands off to the deploy.

### Modified Capabilities

None.

## Impact

- New: `Dockerfile`, `.dockerignore` and `.github/workflows/ci.yml`.
- Changed: `next.config.ts` gets `output: 'standalone'`.
- New GHCR package: `ghcr.io/unfixedmold/personal-portfolio`.
- Manual setup: the deploy repo with a `deploy.yml` workflow and the `DEPLOY_REPO_TOKEN` secret here.
- Branch: `add-ci-cd-pipeline`, off `main`.
