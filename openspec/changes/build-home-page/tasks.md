# Tasks

## 1. Research

- [x] 1.1 Create the branch `build-home-page` from `main`. Read `02-guides/forms.md`, `02-guides/server-actions.md`, `03-api-reference/02-components/form.md` and `01-getting-started/07-mutating-data.md` under `node_modules/next/dist/docs/01-app/`. Verify the Contact form decisions in design.md against them: plain form versus `next/form`, the `useActionState` signature, no-JavaScript behaviour of a client form, and update design.md where the docs differ.
- [x] 1.2 Read `01-getting-started/14-metadata-and-og-images.md`, `03-api-reference/04-functions/generate-metadata.md`, `generate-viewport.md`, `image-response.md`, the `03-file-conventions/01-metadata/` folder and `02-guides/json-ld.md`. Verify the Metadata and SEO decisions: the `viewport` export, `ImageResponse` font options and file types, whether the manifest can reference `/icon.svg` and the generated Apple icon, and update design.md where the docs differ.
- [x] 1.3 Read `01-getting-started/12-images.md`, `03-api-reference/02-components/image.md`, `03-api-reference/02-components/link.md` and `02-guides/upgrading/version-16.md`. Verify the Images and the scroll decisions: `preload` over `priority`, static import shape, `scroll-padding-top` with a sticky header, and update design.md where the docs differ.
- [x] 1.4 Inspect the shadcn registry through the shadcn MCP tools for `field`, `spinner` and the `form-next-demo` example, and check `zod`, `schema-dts` and `@axe-core/playwright` for their current major versions and Vitest 5 and Playwright 1.63 compatibility. Verify by listing the exact add and install commands in design.md under Contact form and Tests.
- [x] 1.5 Read `02-guides/testing/vitest.md` and `playwright.md`, and the Playwright docs for `emulateMedia`, `javaScriptEnabled` and `@axe-core/playwright`. Verify by writing the fixture shapes for reduced motion, no JavaScript and the accessibility check into design.md under Tests.

## 2. Content

- [x] 2.1 Extend `lib/site.ts` with the city, monogram, email, the placeholder phone, LinkedIn URL and the headline words, and add `lib/content/hero.ts`, `services.ts` and `method.ts` exporting typed constants with the wireframe copy verbatim. Verify unit tests assert three services with five stack tags each and four method steps numbered 01 to 04.
- [x] 2.2 Add `lib/content/experience.ts`, `education.ts`, `projects.ts` and `contact.ts`, with the project image as an optional static import left unset for both projects. Verify unit tests assert four jobs newest first, two degrees, two awards, two projects with external URLs and no image, and three contact links.

## 3. Site shell

- [x] 3.1 Add `components/site-header.tsx` taking the site config as a prop: the monogram tile, the email, phone and LinkedIn links hidden below `md`, and the call to action Button linking to `#contact`, sticky with backdrop blur, mounted in the root layout with the config. Verify a unit test renders it with test data and asserts the phone from that data and the contact anchor, and a Playwright journey asserts the header stays visible after scrolling and hides the contact links at 375px.
- [x] 3.2 Add `components/site-footer.tsx` taking the owner's name as a prop with the copyright and the current year, mount it in the root layout, and add `scroll-padding-top` and motion-safe smooth scrolling on `html`. Verify a unit test renders it with a test name and asserts that name and the current year.

## 4. Hero, services, method

- [x] 4.1 Add `components/hero.tsx` taking the hero content as a prop, with the eyebrow, the headline with the CSS-only rotating word, the pitch and the staggered rise, plus the keyframes in `globals.css` with `motion-reduce` fallbacks. Verify a unit test renders it with test data and asserts that name, city and pitch are visible, and a Playwright journey asserts the second word appears within a cycle and, with reduced motion, the first word stays.
- [x] 4.2 Add `components/services.tsx` taking the services as a prop: one SurfaceCard per service with GradientTile glyph, title, text, examples and TagPill stack, three columns collapsing to one. Verify a unit test renders three test services and asserts their titles, and the phone journey asserts the cards stack in one column with no horizontal scroll.
- [x] 4.3 Add `components/method.tsx` with `id="method"` taking the steps as a prop: one SurfaceCard per step with a numbered GradientTile, four columns to two to one. Verify a unit test renders test steps and asserts their titles in order.

## 5. Experience, education, projects

- [x] 5.1 Add `components/experience.tsx` and `components/education.tsx` side by side in one section, each taking its content as a prop: job cards with period, role and organisation, the university card with Avatar fallback and the two degrees, the gradient awards card. Verify unit tests render test data and assert every role, degree and award from it is visible.
- [x] 5.2 Add `skeleton` through the shadcn CLI and `components/projects.tsx` with `id="work"` taking the projects as a prop: a full-card external link per project with `next/image` when an image is set or a Skeleton at the 16 by 10 ratio when not, title, type TagPill, description, shows line and domain. Verify unit tests assert the skeleton renders for a project without an image and the image for one with, and a Playwright journey asserts a project card opens the live domain in a new tab.

## 6. Contact

- [x] 6.1 Add `field` and `spinner` through the shadcn CLI and install `zod`. Verify `pnpm lint`, `pnpm typecheck` and `pnpm build` pass.
- [x] 6.2 Add `lib/contact-schema.ts` with the zod schema and a pure `parseContact(formData)` returning values and field errors, honeypot included. Verify unit tests assert the result for an empty form, an invalid email, a filled honeypot and valid input.
- [x] 6.3 Add `lib/contact-action.ts` with `'use server'` and `sendMessage(previousState, formData)` returning the state from `parseContact`, a `TODO` where delivery goes, never throwing. Verify `pnpm typecheck` passes and the file exports only async functions.
- [x] 6.4 Add `components/contact-form.tsx` as the one `'use client'` component: form with `noValidate` bound to `useActionState`, Field, FieldLabel, Input, Textarea and FieldError per control, the hidden honeypot, the pending button with Spinner and an `aria-live` success message. Verify a unit test renders it and asserts the three labels and the send button are visible.
- [x] 6.5 Add `components/contact.tsx` with `id="contact"` taking the contact content as a prop: the gradient-tinted card with the heading, the invitation, the email, phone and LinkedIn rows and the form, and compose every section in `app/page.tsx`, passing each its config. Verify a Playwright journey asserts the header call to action scrolls to the contact section and the three links are visible, and a grep of `components/` finds no email, phone or URL literal.
- [x] 6.6 Add the contact form journeys: empty submit shows an error under each field, a bad email keeps the name and message, a valid submit shows pending then success with cleared fields, and the same valid submit with JavaScript disabled shows the success message after the page reloads. Verify `pnpm test:e2e` passes.

## 7. SEO

- [x] 7.1 Add `openGraph`, `twitter` and `robots` to the root layout metadata and the `viewport` export with the theme color. Verify a Playwright journey reads the head of `/` and asserts the Open Graph title, description, URL, site name and Twitter card are present.
- [x] 7.2 Add `assets/fonts/` with the Plus Jakarta Sans ExtraBold `ttf` and `app/opengraph-image.tsx` rendering the name, headline and gradient at 1200 by 630 from the content. Verify a Playwright journey requests the image URL from the Open Graph tag and asserts a PNG response, and `pnpm build` writes the image.
- [x] 7.3 Add `app/sitemap.ts`, `app/robots.ts` and `app/manifest.ts` from `lib/site.ts`. Verify a Playwright journey requests the three files and asserts the sitemap lists the site URL, robots allows all and names the sitemap, and the manifest carries the name and theme color.
- [x] 7.4 Add `app/icon.svg` with the gradient monogram and `app/apple-icon.tsx` generating the 180 pixel mark, delete the scaffold `favicon.ico`. Verify the head of `/` links an SVG icon and an Apple touch icon and both URLs answer.
- [x] 7.5 Install `schema-dts`, add `lib/json-ld.ts` building the Person from the content, and render the escaped script in `app/page.tsx`. Verify a unit test asserts the Person carries the name, job title, employer, locality and LinkedIn URL, and a Playwright journey parses the script from `/` as JSON with `@type` Person.
- [x] 7.6 Install `@axe-core/playwright` and add the accessibility journey. Verify it reports no violations, one first-level heading, one second-level heading per section and no image without alt text.

## 8. Integration

- [x] 8.1 Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:e2e` and `pnpm build`, then open `/` at 375px and 1280px against the wireframe. Verify all pass and stop at ready to review.

## 9. Wireframe update

- [x] 9.1 Replace the `HG` monogram with the brand mark letter `h` in `lib/site.ts`, redraw `app/icon.svg` as the transparent `</h/>` mark and `app/apple-icon.tsx` as the mark on a white tile, show the `</h/>` mark in `app/opengraph-image.tsx`, and set the manifest short name to the first name. Verify the icon journey still passes and the crawler journey asserts the manifest short name.
- [x] 9.2 Rebuild `components/site-header.tsx` with the `</h/>` mark linking to the top, the owner's name, the nav links from the site config hidden below `lg` and the call to action, with the email, phone and LinkedIn removed. Give the services and experience sections their ids, move the scroll offset to about 100 pixels of `scroll-padding-top` on `html`, and drop `scroll-mt-20`. Verify a unit test asserts the nav links from test data, and the header journey asserts the Experience link scrolls to the experience heading and the nav is hidden at 375px.
- [x] 9.3 Split the heart into its own field in `lib/content/hero.ts`, color it with a new `--heart` token, drop the trailing periods from the headline tail and the pitch, and update the social image to match. Verify the hero unit test asserts the pitch and the heart from test data.
- [x] 9.4 Add `accordion` through the shadcn CLI, add placeholder `highlights` and `tags` to each job, and make the experience list a client accordion: newest job open by default, pointer enter or activation expands a job, leaving the list restores the newest, no height animation under reduced motion. Verify unit tests assert the newest job's highlights are visible and the others are collapsed, and a Playwright journey asserts a click and an Enter each expand a job and collapse the previous one.
- [x] 9.5 Add the Vilnius University logo under `assets/images/` as a static import rendered through `next/image`, replace the Avatar, and rebuild the awards card with the "Thesis awards" label, `GraduationCap`, and a gold or silver `Medal` badge per award with the new place titles and second award text. Verify unit tests assert the logo image and both places, and the accessibility journey still reports no violations.
- [x] 9.6 Add `LinkedInIcon` for the LinkedIn row in `components/contact.tsx` and drop the `in` glyph from the contact content. Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:e2e` and `pnpm build`, then open `/` at 375px and 1280px against the wireframe. Verify all pass and stop at ready to review.
