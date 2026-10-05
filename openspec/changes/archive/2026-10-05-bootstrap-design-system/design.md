# Design

## Context

- Empty repo with rules, hooks, a Prettier config and the wireframes. See proposal.md for why.
- The edit hook runs Prettier and ESLint on every edit once `package.json` exists, so the tool configs land first.
- The wireframe is a single light page. Its styles are inline in the extracted template inside `wireframes.html`.

## Goals / Non-Goals

**Goals:**

- One place for every color, radius and font: the shadcn theme variables in `app/globals.css`.
- Primitives come from the shadcn CLI, unchanged except for the added Button variant.
- Shared components are thin: Tailwind classes over the primitives, no state.

**Non-Goals:**

- Dark mode, a theme switcher or any theme package.
- Any section content, form handling or animation beyond the backdrop and hover lift.
- CI workflows.

## Decisions

- **Scaffold with `create-next-app`** at the root, no `src/` folder, import alias `@/*`, Tailwind v4, ESLint. It matches the layout CLAUDE.md fixes and is the reuse-first choice.
- **shadcn `radix-vega` preset, `neutral` base, CSS variables on.** The CLI now ships presets; vega keeps the classic new-york proportions. Then overwrite the light variables with the wireframe values. The `.dark` block is deleted, since it is dead code here.
- **Theme variables map to the wireframe like this:** `background` `#fbfaff`, `foreground` `#12101f`, `primary` `#5b2edb`, `secondary` and `accent` `#efeafd` with `#5b2edb` foreground, `muted-foreground` `#5d5876`, `border` `rgba(124,77,255,.1)`, `input` `#e6e2f5`, `ring` `#7c4dff`, `radius` `0.75rem`. The gradient end `#8b5cf6` and the faint text `#9a95b3` are added as extra variables.
- **Font through `next/font/google`** with weights 400 to 800 exposed as a CSS variable that the theme's `--font-sans` reads. Self-hosted at build time, no runtime request.
- **Button gets a `gradient` variant** added in `components/ui/button.tsx` and becomes the default variant. Editing the copied primitive is how shadcn is meant to be customized. The flat `default` variant is removed since nothing uses it.
- **Card, Badge, Input, Textarea, Label, Avatar** are added unchanged. Wireframe radii larger than the token, like 22px cards, are set by the shared components with Tailwind classes.
- **Shared components in `components/`:** `Section` (container, gutters, vertical padding), `SectionHeading` (title and subtitle, centered), `GradientTile` (sized square, gradient, white content), `SurfaceCard` (Card with white or translucent white surface and hover lift), `TagPill` (Badge with the lavender look). All server components.
- **Backdrop** is a fixed, `pointer-events-none`, `-z-10` layer in the root layout with the four glows and the two drift keyframes in `globals.css`. `overflow-x: hidden` on the root wrapper stops the off-screen glows from adding scroll.
- **ESLint:** the Next.js config plus `padding-line-between-statements` from the code rule and `eslint-config-prettier` so the two tools never fight. Prettier keeps the existing `.prettierrc` and adds the Tailwind plugin for class order.
- **Vitest** with the React plugin and jsdom, tests in `tests/`, helpers in `tests/support/`. **Playwright** with Chromium only, tests in `e2e/`, a fixtures file in `e2e/support/`, and the dev server started by the config.
- **Scripts:** `dev`, `build`, `lint`, `format` (Prettier write), `typecheck` (`tsc --noEmit`), `test` (Vitest run), `test:e2e` (Playwright), `prepare` (hooks path).

## Risks / Trade-offs

- [Tailwind v4 and the shadcn CLI move fast; generated files may differ from this design] → Take what the CLI generates and adjust only the theme values and the Button variant.
- [The edit hook fails until dependencies are installed] → The first task installs before any file is edited by hand.
- [Playwright needs a browser in the container] → The devcontainer feature ships Chromium; the config points at it and `test:e2e` fails with a clear message if it is missing.
- [Removing the flat Button variant surprises a future contributor] → The gradient variant is the default, so the plain `<Button>` still works.
