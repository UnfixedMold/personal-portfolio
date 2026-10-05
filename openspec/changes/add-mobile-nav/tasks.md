# Tasks

## 1. Primitive

- [x] 1.1 Add the shadcn Collapsible with `pnpm dlx shadcn@latest add collapsible` and verify `components/ui/collapsible.tsx` exists and `pnpm typecheck` passes

## 2. Mobile menu

- [x] 2.1 Re-read the Tailwind and client component guides in `node_modules/next/dist/docs/01-app/` that apply, before writing code
- [x] 2.2 Add `components/mobile-nav.tsx` as a client leaf: the Collapsible button with the animated bars, the panel under the header with the arrow rows, closing on a link click and on a click outside it; verify `pnpm typecheck` and `pnpm lint` pass
- [x] 2.3 Render it in `components/site-header.tsx` below `lg`, make the header `relative`, remove the name from the header and label the home link with the full name; verify at 375px and 1280px with the dev server against the wireframe
- [x] 2.4 Update the `Header` page object with `menuButton`, `menu` and `openMenu`, rewrite the phone scenario, and add one test per new menu scenario in `e2e/header.test.ts`; verify `pnpm test:e2e e2e/header.test.ts` passes
- [x] 2.5 Rename the header call to action to "Get in touch" in `lib/site.ts` and in the `Header` page object; verify `pnpm test:e2e e2e/header.test.ts` passes

## 3. Integration

- [x] 3.1 Run `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm test:e2e` and verify all pass, including the accessibility and phone layout journeys
