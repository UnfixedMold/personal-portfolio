# CLAUDE.md

Personal portfolio site. One pnpm project at the repo root: Next.js App Router with shadcn/ui, changes planned with OpenSpec.

## Layout

- `app/`: routes and layouts.
- `components/`: shared components, shadcn primitives in `components/ui/`.
- `lib/`: helpers and data.
- `tests/`: Vitest unit tests. `e2e/`: Playwright journeys.
- `openspec/`: specs and changes.
- `wireframes.html`: the page wireframes, the design reference until the pages exist.

## Rules

- `.claude/rules/next.md`: App Router invariants, loaded when app, component or lib files are touched.
- `.claude/rules/design.md`: design patterns and reuse, loaded when a page or component is touched.
- `.claude/rules/tests.md`: how a test is named and what it asserts, loaded when a test file is touched.
- `.claude/rules/git.md`: commits, branches, hooks and the delivery skills.
- `.claude/rules/code.md`: reuse first and code style.
- `.claude/rules/writing.md`: how every prose file is written. A rule is invariants and where to look, under 50 lines.

## Scripts

- `dev`, `build`, `lint`, `format`, `typecheck`, `test`, `test:e2e`.
- `prepare` runs `git config core.hooksPath .githooks`, so `pnpm i` wires the hooks.
- Every edit is formatted and linted by the hook in `.claude/settings.json`.

## Tests

- All test files are named `*.test.ts`.
- Helpers, fixtures and data live in `support/` inside the suite's folder.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
