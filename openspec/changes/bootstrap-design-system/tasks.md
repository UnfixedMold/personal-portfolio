# Tasks

## 1. Scaffold

- [x] 1.1 Create the branch `bootstrap-design-system` and scaffold Next.js at the root with `create-next-app`: TypeScript, Tailwind v4, ESLint, App Router, no `src/`, alias `@/*`. Verify `pnpm dev` serves the default page.
- [x] 1.2 Add Prettier with the Tailwind plugin, `eslint-config-prettier` and the padding rule to the ESLint config, and the scripts `lint`, `format`, `typecheck` and `prepare`. Verify `pnpm lint`, `pnpm format` and `pnpm typecheck` pass and `git config core.hooksPath` prints `.githooks`.
- [x] 1.3 Add `.env.example` empty and `.gitignore` entries the scaffold missed. Verify `git status` shows no build output.

## 2. Tests wiring

- [x] 2.1 Add Vitest with jsdom and the React plugin, `tests/support/`, and the `test` script. Verify `pnpm test` runs a trivial test of the `cn` helper and passes.
- [x] 2.2 Add Playwright with Chromium, `e2e/support/fixtures.ts` and `e2e/support/data.ts`, the dev server in the config, and the `test:e2e` script. Verify `pnpm test:e2e` runs a smoke test that `/` answers.

## 3. Theme

- [x] 3.1 Run `shadcn init` with the `new-york` style, `neutral` base and CSS variables. Verify `components.json` exists and `pnpm build` passes.
- [x] 3.2 Set the wireframe values on the light theme variables in `app/globals.css` per design.md, add the gradient end and faint text variables, delete the `.dark` block. Verify the home page background renders lavender-white.
- [x] 3.3 Load Plus Jakarta Sans through `next/font/google` in the root layout and point `--font-sans` at it. Verify the page renders in the font with no request to a font host in the network tab.

## 4. Primitives

- [x] 4.1 Add Button, Card, Badge, Input, Textarea, Label and Avatar through the shadcn CLI. Verify `pnpm lint` and `pnpm typecheck` pass.
- [x] 4.2 Replace the flat `default` Button variant with the `gradient` pill variant and make it the default. Verify a unit test renders `<Button>` and asserts the gradient and pill classes.

## 5. Shared components

- [x] 5.1 Add `Section` and `SectionHeading` in `components/`. Verify unit tests render a title and subtitle and assert both are visible.
- [x] 5.2 Add `GradientTile` and `TagPill`. Verify unit tests render each with content and assert the content is visible.
- [x] 5.3 Add `SurfaceCard` over Card with the white and translucent variants. Verify a unit test renders children and asserts they are visible.

## 6. Site shell

- [x] 6.1 Add the glow backdrop and its keyframes to the root layout and `globals.css`, with `pointer-events-none`, `-z-10` and `overflow-x-hidden` on the wrapper. Verify the page at 375px wide has no horizontal scroll.
- [x] 6.2 Replace the scaffold home page with an empty themed page inside a `Section`, and set the title, description and canonical metadata. Verify the response HTML carries the title, description and canonical link.
- [x] 6.3 Extend the smoke test to assert the visitor sees the themed home page, and add the canonical check as a unit test on the metadata export. Verify `pnpm test` and `pnpm test:e2e` pass.

## 7. Integration

- [x] 7.1 Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:e2e` and `pnpm build`. Verify all pass and stop at ready to review.
