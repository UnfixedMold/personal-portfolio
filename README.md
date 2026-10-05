# Personal portfolio

Personal portfolio site. Next.js with shadcn/ui, changes planned with OpenSpec.

## Develop

Open the repo in the devcontainer (VS Code: "Reopen in Container"). It provides node 26, pnpm 12, the GitHub CLI, the OpenSpec CLI and Claude Code, and runs `pnpm i --frozen-lockfile` once a lockfile exists.

The dev server is exposed on `127.0.0.1:3000`. To run several clones side by side, copy `.devcontainer/.env.example` to `.devcontainer/.env` and set a different `FRONT_PORT` in each.

Claude Code mounts `~/.claude` from the host, so logins and settings carry over into the container. The shadcn and Playwright MCP servers are configured in `.mcp.json`; the container ships Chromium for Playwright.

## Conventions

`CLAUDE.md` lists the rules in `.claude/rules/`. Git hooks in `.githooks/` lint and format staged files and refuse pushes to `main`; `pnpm i` wires them through the `prepare` script. `main` moves only by a squash-merged pull request; the ruleset is in `.github/rulesets/main.json`.

## Deploy

CI in `.github/workflows/ci.yml` checks every pull request. On `main` it also publishes `ghcr.io/unfixedmold/personal-portfolio` as `:latest` and `:sha-<short sha>`, then dispatches the deploy in [personal-portfolio-deploy](https://github.com/UnfixedMold/personal-portfolio-deploy) with that tag. The dispatch needs a `DEPLOY_REPO_TOKEN` secret allowed to run workflows there.

The image is the Next.js standalone build from `Dockerfile`. It carries no configuration; the deploy repo passes the SMTP and contact settings at runtime.
