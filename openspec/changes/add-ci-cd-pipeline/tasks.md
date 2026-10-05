# Tasks

## 1. Setup

- [ ] 1.1 Create the branch `add-ci-cd-pipeline` from `main`. Read `01-getting-started/17-deploying.md`, `02-guides/self-hosting.md` and `03-api-reference/05-config/01-next-config-js/output.md` under `node_modules/next/dist/docs/01-app/`. Verify the Standalone image decision in design.md against them, and update design.md where they differ.

## 2. Image

- [ ] 2.1 Set `output: 'standalone'` in `next.config.ts`. Verify `pnpm build` creates `.next/standalone/server.js`.
- [ ] 2.2 Add the multi-stage `Dockerfile` and `.dockerignore` from design.md. Verify `docker build -t protfolio .` succeeds and the image holds no `.env` file and no dev dependency.
- [ ] 2.3 Smoke test the image: `docker run --rm -p 3000:3000 protfolio`. Verify `curl -I http://localhost:3000` returns 200 and a CSS file and an image from the page return 200.

## 3. Check

- [ ] 3.1 Add the HTML reporter to `playwright.config.ts`. Verify `pnpm test:e2e` writes `playwright-report/index.html`.
- [ ] 3.2 Add `.github/workflows/ci.yml` with the `Check` job on `push` to `main`, `pull_request` and `workflow_dispatch`, and the report upload on failure. Verify `Check` passes on the branch's pull request.
- [ ] 3.3 Push a temporary commit with an unformatted file. Verify `Check` fails on the Prettier step and names the file, then push a commit that removes the file. No force push.

## 4. Publish and deploy

- [ ] 4.1 Add the `Publish image` job with the GHCR login, metadata tags and gha cache. Verify the job is skipped on the pull request run.
- [ ] 4.2 Add the `Trigger deploy` job gated on `vars.DEPLOY_REPO`. Verify the job is skipped on the pull request run and `actionlint` passes on `ci.yml`.

## 5. Required check

- [ ] 5.1 Restore the `Check` required status check in `.github/rulesets/main.json`, the `Check` guard in `.claude/skills/git-merge-pr/SKILL.md`, and the `Check` wording in `.claude/rules/git.md`, `CLAUDE.md` and `README.md`. Verify `git diff b497a30^ b497a30 -- .github/rulesets/main.json` shows the same rule that was removed.

## 6. Release

- [ ] 6.1 After the merge, the owner applies the ruleset with `gh api`. Verify the first `main` run publishes `ghcr.io/unfixedmold/protfolio` with `latest` and `sha-<short sha>`, and `Trigger deploy` is skipped.
- [ ] 6.2 The owner creates the deploy repo with a `deploy.yml` taking `name` and `tag`, then sets `DEPLOY_REPO` and `DEPLOY_REPO_TOKEN`. Verify a rerun of the `main` workflow starts a deploy run with the `sha-` tag.
