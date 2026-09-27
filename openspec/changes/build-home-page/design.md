# Design

## Context

- The shell exists: theme variables, Button, Card, Badge, Input, Textarea, Label, Avatar, and the shared Section, SectionHeading, GradientTile, SurfaceCard and TagPill. See the bootstrap change. Motivation is in proposal.md.
- `lib/site.ts` holds the name, description and URL. The root layout sets `metadataBase`, the title template and the description. The home page sets the canonical.
- The wireframe is one page at `/` with anchors `#services`, `#method`, `#experience`, `#work` and `#contact`. The header links three of them. The interactive parts are the rotating hero word, hover lifts, the experience accordion and the contact form. No mobile menu. The one image is the university logo.
- Next.js is 16.3.6. Its docs live in `node_modules/next/dist/docs/01-app/`. This version differs from older knowledge: `next build` does not lint, `priority` on images is deprecated for `preload`, `themeColor` moves to a `viewport` export, the router no longer overrides smooth scrolling, static export forbids server actions.
- The docs were read once while planning. The research tasks re-read the same guides before code, because the implementer starts from a fresh context and the docs are the source of truth.

## Goals / Non-Goals

**Goals:**

- Content as data: one typed module per section in `lib/content/`, read by the section component, the JSON-LD and the social image.
- Server components everywhere except the contact form and the experience accordion. Animations are CSS.
- Every SEO artifact comes from a Next.js file convention or metadata field, never a hand-written tag, except the JSON-LD script the docs say to render by hand.
- The form is the Next.js 16 documented shape, ready for a delivery action to drop in.

**Non-Goals:**

- Sending the contact message anywhere. No email provider, no env key, no rate limit beyond the honeypot.
- Active section highlighting in the nav, a mobile menu, dark mode or a blog.
- `cacheComponents`, `'use cache'` or any caching config. A static page with one action needs none.
- Real project screenshots and the real phone number. The config holds a skeleton slot and a placeholder number; the owner fills both in later without touching a component.

## Decisions

### Content config

- **One module per section in `lib/content/`**: `hero.ts`, `services.ts`, `method.ts`, `experience.ts`, `education.ts`, `projects.ts`, `contact.ts`. Each exports a typed constant and its type. `lib/site.ts` keeps the site-wide values and gains the email, phone, LinkedIn URL, city, the brand mark letter `h` and the nav links as label and anchor pairs.
- **Components hold no data.** Every section component takes its content as a prop, typed by the content module. `app/page.tsx` and `app/layout.tsx` are the only files that import the config and pass it in. A unit test renders a component with its own data, so a hardcoded value fails the test.
- The data itself is provisional. What matters is that the wireframe copy, the links and the placeholders live in these modules and nowhere else.
- Copy is taken from the wireframe verbatim, including the non-breaking hyphens in end‑to‑end and Spec‑driven and the ♥ in the headline. The headline tail and the pitch have no trailing period.
- The hero headline keeps the heart in its own field, so the component colors it without parsing copy.
- Each job carries `highlights` and `tags`. The wireframe's highlights are lorem ipsum, so the config holds placeholder highlights the owner replaces, like the phone number.
- The education school carries its `logo` as a static import from `assets/images/`. Each award carries its place, its label and a `medal` of `gold` or `silver`.
- The wireframe's `stats` array is not rendered anywhere in the wireframe, so it is dropped.
- The phone number in the wireframe is a placeholder. It lands in `lib/site.ts` as is; the header, contact section, manifest and JSON-LD read it from there, so the owner replaces one line.
- Alternative considered: MDX or a CMS. Rejected, one person edits one page.

### Sections

- **One server component per section in `components/`**, flat like the existing components: `site-header`, `hero`, `services`, `method`, `experience`, `education`, `projects`, `contact`, `contact-form`, `site-footer`. `app/page.tsx` composes them inside `main`. The header and footer go in `app/layout.tsx`.
- Each section reuses Section and SectionHeading. Cards are SurfaceCard, tags are TagPill, glyphs and step numbers are GradientTile, the award card is a SurfaceCard with the gradient utility.
- The university logo renders through `next/image` at 60 pixels. The awards card opens with a "Thesis awards" label and the lucide `GraduationCap`. Each award shows the lucide `Medal` in a gold or silver circle, with theme tokens for both tones.
- The red heart in the headline uses a `--heart` theme token.
- Sections with anchors get an `id`. The scroll offset lives once, as `scroll-padding-top` of about 100 pixels on `html`, the documented fix in the Link guide. `html` also gets `scroll-smooth` under `motion-safe`.
- Grids follow the wireframe: services three columns to one, method four to two to one, experience and projects `auto-fit` with a minimum column. Tailwind breakpoints `md` and `lg` stand in for the wireframe's 820, 900 and 1000 pixel container queries.

### Hero animation

- **CSS only.** The three words are stacked in a fixed-height clipped box. One `word-cycle` keyframe in `globals.css`, timed for three words, fades and slides each word in and out over an eight-second cycle; the second and third word start 2.6 and 5.2 seconds late. The entrance rise on eyebrow, headline and pitch is a keyframe with staggered delays.
- `motion-reduce:animate-none` on every animated element leaves the first word visible and static. No JavaScript, no hydration, no timer.
- Alternative considered: a client component with a timer, as the wireframe does. Rejected, it needs `'use client'`, an effect and a reduced-motion hook for a decorative effect.

### Experience accordion

- **The shadcn `accordion` primitive**, added through the CLI, with a single open item that cannot collapse and the newest job as the default value.
- A small `'use client'` component controls the value. A mouse entering a job expands it, and leaving the list returns to the newest job. Touch pointers are ignored, so a finger that lands on a job to scroll does not open it. A tap, click or Enter on the trigger button expands a job, and keyboard use and ARIA state come with the primitive.
- On a wide card the role and period share one row with the organisation below. On a narrow card the period moves under the organisation, decided by a container query on the list. The expanded content is the highlights list and the TagPill stack.
- The height animation uses the primitive's content height variable and is off under reduced motion.
- Alternative considered: an exclusive `<details name>` group. Rejected, it cannot open on hover and offers no controlled value.

### Contact form

- **Plain form element with a server action**, per the Next.js 16 forms guide. The `Form` component from `next/form` is for string actions with search params; with a function action the docs say it behaves like a React form, so it adds nothing here. The research task confirms this before code.
- **State through `useActionState`**: the action signature is `(previousState, formData)`, and the tuple gives the state, the bound action and `pending`. The form is the one `'use client'` component. The submit button reads `pending` for its label and disabled state, the fields read `pending` for disabled and the state for values and errors.
- **Validation with `zod`** in `lib/contact-schema.ts`: name and message non-empty strings, email a valid address, honeypot an empty string. The form sets `noValidate` so the server result is the only error source, and keeps `type="email"` for the keyboard.
- **Action in `lib/contact-action.ts`** with a file-level `'use server'`. It parses the form data, returns `{ values, errors }` on failure and `{ success: true }` with empty values on success. A filled honeypot returns success without doing anything else. A `TODO` marks where delivery goes. Nothing throws.
- **Layout with shadcn `field`**: Field, FieldLabel, FieldError for each control; `spinner` in the pending button. Both are added through the CLI. The labels are visible, the wireframe's placeholder-only look is an accessibility gap.
- **Success message inline**, in an `aria-live` region under the form, in place of the wireframe's button label swap, so a screen reader hears it. The button still shows the pending label while in flight.
- **No JavaScript**: the action id posts to the same page, the page re-renders with the state. A Playwright context with JavaScript disabled covers it.
- Alternatives considered: react-hook-form or TanStack Form. Rejected, three fields need no form library and the server is the source of truth.
- Research, 2026-09-26: the forms guide shows exactly this shape, a plain form bound to `useActionState` with `(prevState, formData)` and `pending` from the tuple. The `next/form` reference says a function action makes it behave like a React form and ignores `replace` and `scroll`. Client forms queue submissions until hydration; a page without JavaScript posts the action id and re-renders. `zod` is at 4.x: the email rule is `z.email()` and field errors come from `z.flattenError(error).fieldErrors`. The shadcn `field` item pulls in `label` and `separator`; the add command is `pnpm dlx shadcn@latest add field spinner skeleton`. Install: `pnpm add zod schema-dts` and `pnpm add -D @axe-core/playwright`.

### Metadata and SEO

- **Static `metadata` object**, not `generateMetadata`, since nothing depends on the request. The root layout keeps `metadataBase`, the title template and the description, and gains `openGraph` with title, description, url, siteName, locale `en_US`, type `website`, and `twitter` with `summary_large_image`. The image comes from the file convention, which overrides the images field. `robots` allows indexing with large image previews.
- **`viewport` export** in the layout carries `themeColor` `#fbfaff` and `colorScheme: 'light'`. These are deprecated inside `metadata`.
- **Social image at `app/opengraph-image.tsx`** with `ImageResponse` from `next/og`, `size` 1200 by 630, `alt` from the content, statically generated at build. It renders the name, the headline with the first word and the gradient. Only flexbox works inside it. A Twitter image file is not added; the Twitter card reads the Open Graph image.
- **Font in the social image**: `ImageResponse` accepts `ttf`, `otf` and `woff`, not `woff2`, and cannot read the `next/font` cache. One Plus Jakarta Sans ExtraBold `ttf` under `assets/fonts/` is read with `readFile` at module scope. Plus Jakarta Sans is under the SIL Open Font License, which allows this. The research task confirms the font option shape; the fallback is the default sans in the image.
- **`app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`** with the `MetadataRoute` types. The sitemap lists the site URL with `lastModified` set at build. Robots allows every agent and points at the sitemap. The manifest carries the name, the first name as short name, the theme and background colors and the icons.
- **Icons**: `app/icon.svg` is the `</h/>` mark on a transparent background at full width, with the glyphs converted to outlines from the brand font so no font loads. The `h` turns white under a dark color scheme so it stays visible in dark tab bars. `app/apple-icon.png` is the same SVG rendered once to a 180 pixel PNG on a white tile, because iOS does not take an SVG touch icon. The social image shows the `</h/>` mark. The scaffold `favicon.ico` is deleted, it is the Next.js logo. The research task checks whether the manifest can point at the generated icon paths or needs copies in `public/`.
- **JSON-LD** built by `lib/json-ld.ts` from the content modules, typed with `schema-dts` as `WithContext<Person>`: name, jobTitle, worksFor, address locality, email, sameAs with the LinkedIn URL, alumniOf, knowsAbout from the service titles, url. Rendered in `app/page.tsx` as a script tag whose JSON has `<` replaced by its unicode escape, the pattern the JSON-LD guide gives.
- Alternative considered: `next-seo` or `next-sitemap`. Rejected, the framework covers every file natively.
- Research, 2026-09-26: confirmed. `ImageResponse` fonts take `{ name, data, weight, style }` with `ttf`, `otf` or `woff` read once at module scope; only flexbox layouts work and the bundle limit is 500KB. Generated images are statically optimized at build. `apple-icon.tsx` is a valid generated icon; an `icon.svg` gets `sizes="any"`. The head links icons at `/icon?<hash>`, so the manifest icon paths are checked against the dev server head at task 7.4 and copied to `public/` only if the hashed path is unusable. The JSON-LD guide renders a native script tag with `<` escaped and types it with `schema-dts`. The `viewport` export holds `themeColor` and `colorScheme`.

### Images

- **Project screenshots as optional static imports** in `lib/content/projects.ts` from `assets/images/`, so width, height and blur placeholder are inferred. Both projects ship without one. The card renders `next/image` with `sizes` for the two-column grid when an image exists, and the shadcn `skeleton` primitive at the 16 by 10 aspect ratio when it does not. No screenshot is `preload`ed, they sit below the fold.
- Alternative considered: a labelled dark placeholder as in the wireframe. Rejected, a skeleton is the pattern visitors already know for content that is not there yet, and it is a primitive the CLI ships.
- `priority` is deprecated in Next.js 16; nothing above the fold is an image, so no `preload` either.
- No remote images, so no `remotePatterns`. `next.config.ts` stays empty unless research finds a reason.
- Research, 2026-09-26: confirmed. `priority` is deprecated since 16.0 for `preload`, and the reference prefers `loading="eager"` or `fetchPriority="high"` over `preload` in most cases. The Link reference documents `scroll-padding-top` on `html` for sticky headers. Next.js 16 no longer overrides `scroll-behavior: smooth` during navigation, so the CSS rule works unaided.

### Header and footer

- **Header** is a server component in the root layout: sticky, translucent card background, backdrop blur, bottom border. Left the `</h/>` text mark linking to the top and the owner's name. Below 640 pixels the header shows the short name from the site config instead. Right the nav links from the site config, then the Button linking to `#contact`. The header has no contact links; the contact section holds them. The nav is `hidden lg:flex`.
- The LinkedIn logo in the contact section is a hand-written `LinkedInIcon` SVG component. `lucide-react` 1.x ships no brand icons.
- **Footer** prints the copyright with the current year computed at render. The page is static, so the year updates on each build; a yearly build is acceptable for a portfolio.

### Tests

- **Unit** in `tests/` only for what a browser journey cannot show: the honeypot, the JSON-LD escaping, a project with a screenshot, jobs ordered newest first and the three hero words the keyframes are timed for. Nothing is tested in both suites.
- **End to end** in `e2e/`, one file per journey: the header, the hero, the sections on a phone, the projects, the contact form, the no-JavaScript form, the crawler files, the structured data, the accessibility check. Page objects per section in `e2e/support/`, registered as fixtures. Test data in `e2e/support/data.ts`.
- **Reduced motion** through `page.emulateMedia({ reducedMotion: 'reduce' })` in a fixture. **No JavaScript** through a context with `javaScriptEnabled: false` in a fixture.
- **Accessibility** with `@axe-core/playwright`, a new dev dependency, asserting no violations on `/`.
- Metadata is asserted from the response HTML through the page's head, not by importing the exports, because the layout merges them.
- Research, 2026-09-26: the Vitest guide says async server components need end to end tests; every section here is synchronous, so unit rendering works. Fixture shapes: the Playwright config sets `reducedMotion: 'reduce'` for every test, because smooth scrolling made elements move under Playwright's stability check, and the word-rotation journey opts back in with `test.use({ reducedMotion: 'no-preference' })`; no JavaScript is `test.use({ javaScriptEnabled: false })` at the top of that journey file; the accessibility check is `new AxeBuilder({ page }).analyze()` from `@axe-core/playwright` 4.13, which peers on any Playwright 1.x. Versions: `zod` 4.6, `schema-dts` 2.0.

## Risks / Trade-offs

- [Prop-driven sections add a wiring line per section in `app/page.tsx`] → Accepted, it is the price of components that hold no data and of unit tests with their own data.
- [The docs may differ from this design on `next/form`, `ImageResponse` fonts or icon paths] → The research tasks read the guides first and update this file where they differ, before the affected task starts.
- [Playwright starts `next dev`, where the social image and metadata routes render on request, not at build] → The crawler tests assert the response, not build output. One task runs `pnpm build` and checks the generated image once.
- [A CSS-only word rotation cannot pause on hover or sync with load] → Accepted, it is decorative and the reduced-motion path is simpler than any script.
- [The form works without JavaScript only if the client component's action survives a full page post] → The no-JavaScript journey is a test from the start, so a failure shows on the first task.
- [Deleting `favicon.ico` leaves old browsers without an icon] → Accepted; every current browser reads `icon.svg`, and the Apple icon covers iOS.
- [The copyright year and the sitemap date are fixed at build] → Accepted, redeploys happen more than yearly.
- [`schema-dts` and `zod` are new dependencies] → Both are small, typed and maintained. `zod` is what the Next.js forms guide uses.
- [Static export is impossible with a server action] → The site deploys as a Node server. Noted so nobody adds `output: 'export'` later.
- [The Vilnius University logo is a trademark] → Accepted, it marks a factual affiliation on a CV page.
- [The hover-driven accordion moves content under the pointer] → Hover applies to a mouse only. On touch screens a job opens only on a tap.

## Open Questions

- Which screenshots the owner supplies for the two projects, and when. The skeleton slot covers the wait.
- The real phone number. The config holds the wireframe placeholder until the owner replaces it.
- The real highlights for each job. The config holds placeholders until the owner replaces them.
