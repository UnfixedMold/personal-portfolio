# Tasks

## 1. Image folders

- [x] 1.1 Move `vilnius-university.png` to `assets/images/education/` and the two project screenshots to `assets/images/projects/`, update the imports in `lib/content/education.ts` and `lib/content/projects.ts`, and verify `pnpm typecheck` and `pnpm build` pass

## 2. Primitive and content

- [x] 2.1 Add the shadcn Dialog with `pnpm dlx shadcn@latest add dialog` and verify `components/ui/dialog.tsx` exists and `pnpm typecheck` passes
- [x] 2.2 Move `assets/images/awards/award-1.webp` to `assets/images/education/masters-thesis.webp` and `award-2.jpg` to `bachelors-thesis.webp` converted to WebP at most 1600px on the long edge, delete `awards/`, and verify both are under 300KB with `ls -l`
- [x] 2.3 Add `photo` and `photoLabel` to `Award` in `lib/content/education.ts`, fill them for both awards, give the test awards in `tests/support/content.ts` a photo and a label, and verify `pnpm typecheck` passes

## 3. Dialog

- [x] 3.1 Re-read the client component and image guides in `node_modules/next/dist/docs/01-app/` that apply, before writing code
- [x] 3.2 Add `components/award-dialog.tsx` as a client leaf: the award panel as the trigger with the "View photo" hint, the photo through `next/image` with the place and label as the title; render it from `components/education.tsx`; verify `pnpm typecheck` and `pnpm lint` pass
- [x] 3.3 Add `tests/education.test.ts` asserting a button per award named by its place and that activating one shows a dialog with the photo, and verify `pnpm test tests/education.test.ts` passes
- [x] 3.4 Check the panel, hover state and open dialog at 375px and 1280px with the dev server against the education card's existing look, and verify the photo and caption fit at 375px

## 4. Journeys

- [x] 4.1 Add the `Education` page object in `e2e/support/education.ts`, register it in `e2e/support/fixtures.ts`, add the award place to `e2e/support/data.ts`, and verify `pnpm typecheck` passes
- [x] 4.2 Add `e2e/education.test.ts` with one test per spec scenario: open by click, close with Escape and focus returns, close by outside click, open by keyboard, photo fits a phone; verify `pnpm test:e2e e2e/education.test.ts` passes

## 5. Integration

- [x] 5.1 Run `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm test:e2e` and verify all pass, including the accessibility journey with a dialog open
