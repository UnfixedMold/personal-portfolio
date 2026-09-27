# Proposal

## Why

The site has a theme, shared components and an empty home page. Visitors, and search engines, see nothing about who the owner is or what they build.

## What Changes

- Build the one-page site the wireframes show at `/`: header, hero, What I build, How I work, Experience and Education, Side projects, Contact, footer.
- The header carries the `</h/>` brand mark, the owner's name, nav links to Services, Experience and Projects, and the call to action.
- The experience list is an accordion that expands one job at a time with its highlights and stack tags.
- The education card shows the Vilnius University logo, and the awards card shows a medal per award.
- Put every piece of copy, every link, the phone number and every job, project and service into typed content config modules in `lib/content/`. Components take their content as props and hold no literal value.
- Add the rotating hero word and the entrance animations as CSS animations that respect reduced motion.
- Build the contact form with the modern Next.js form stack: a form element bound to a server action, `useActionState` for the result and pending states, the shadcn Field primitives for labels and errors. The action validates and returns a result state but delivers nothing. Delivery is a later change.
- Add full SEO support: Open Graph and Twitter metadata, a generated social image, `robots.txt`, `sitemap.xml`, a web manifest, icons and Person JSON-LD built from the same content modules.
- Show a skeleton placeholder in each project card's image slot. A screenshot is added later as one entry in the project's config, rendered through `next/image`.
- Start with a research phase: read the Next.js 16 guides and the shadcn registry for each area before writing code, and record the findings in design.md.
- Add a unit test per section and content module and a Playwright journey per visitor scenario.

## Capabilities

### New Capabilities

- `home-page`: the sections of the one-page portfolio and the content they show.
- `contact-form`: the contact form, its validation and its result states, without delivery.
- `seo`: the metadata, social image, crawler files and structured data every crawler reads.

### Modified Capabilities

- `site-shell`: adds the sticky header and the footer around the page content. The existing metadata requirement stays as is; the richer metadata lives in `seo`.

## Impact

- New: `content` modules in `lib/`, section components in `components/`, the form action, metadata route files in `app/`, an `icon` and a social image.
- New: the university logo under `assets/images/` and the nav links in `lib/site.ts`.
- Changed: `app/layout.tsx` gains the header and footer, `app/page.tsx` composes the sections, `next.config.ts` may gain image settings.
- New dependencies: `zod` for the form schema, `schema-dts` for the structured data types, shadcn `field`, `spinner`, `skeleton` and `accordion` through the CLI.
- No env key, no external service, no email provider yet.
- Branch: `build-home-page`, off `main` after the bootstrap pull request, which is already merged.
