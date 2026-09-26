# Proposal

## Why

The repo has rules, hooks and wireframes but no app. Every later change needs a project to build in and a theme to build with.

## What Changes

- Bootstrap the Next.js App Router project with TypeScript, Tailwind v4, ESLint, Prettier, Vitest and Playwright.
- Add the scripts CLAUDE.md lists: `dev`, `build`, `lint`, `format`, `typecheck`, `test`, `test:e2e` and `prepare`.
- Initialize shadcn/ui and set the wireframe theme as CSS variables: colors, radius and the Plus Jakarta Sans font. Light only.
- Add the primitives Button, Card, Badge, Input, Textarea, Label and Avatar through the shadcn CLI.
- Give Button a gradient pill variant, the only primary button the wireframe uses.
- Add the shared components the wireframe repeats: Section, SectionHeading, GradientTile, SurfaceCard and TagPill.
- Add the root layout with the font, the glow backdrop and an empty home page that renders the theme.
- Add a unit test per shared component and a smoke test that the site answers.

Section content such as hero, services or contact comes in later changes.

## Capabilities

### New Capabilities

- `design-system`: the theme tokens, the primitives and the shared components every page is built from.
- `site-shell`: the root layout, the home page and the metadata every public page carries.

### Modified Capabilities

None.

## Impact

- New: `package.json`, `app/`, `components/`, `lib/`, `tests/`, `e2e/` and the tool configs at the root.
- The edit hook in `.claude/settings.json` and the git hooks start running once `package.json` exists.
- The devcontainer runs `pnpm i --frozen` once the lockfile exists.
- Branch: `bootstrap-design-system`.
