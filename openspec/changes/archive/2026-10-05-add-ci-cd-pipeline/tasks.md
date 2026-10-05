# Tasks

## 1. Setup

- [x] 1.1 Create the branch `add-ci-cd-pipeline` from `main`. Read the deploying, self-hosting and `output` guides under `node_modules/next/dist/docs/01-app/`. Verify the Standalone image decision in design.md against them.

## 2. Image

- [x] 2.1 Set `output: 'standalone'` in `next.config.ts`. Verify `pnpm build` creates `.next/standalone/server.js`.
- [x] 2.2 Add the multi-stage `Dockerfile` and `.dockerignore` from design.md. Verify `docker build` succeeds and the image holds no `.env` file and no dev dependency.
- [x] 2.3 Smoke test the image on port 3000. Verify the home page, a CSS file and an image return 200.

## 3. Check

- [x] 3.1 Add `.github/workflows/ci.yml` with the `Check` job, the Mailpit service and the report upload on failure. Verify `Check` passes on the branch's pull request.

## 4. Publish and deploy

- [x] 4.1 Add the `Publish image` job with the GHCR login, metadata tags and gha cache. Verify the job is skipped on the pull request run.
- [x] 4.2 Add the `Trigger deploy` job for `UnfixedMold/personal-portfolio-deploy`. Verify the job is skipped on the pull request run.

## 5. Release

- [x] 5.1 The owner creates the deploy repo with a `deploy.yml` taking `name` and `tag`, then sets `DEPLOY_REPO_TOKEN`. Verify the first `main` run publishes the image and starts a deploy run with the `sha-` tag.
