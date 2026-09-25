---
paths:
  - "app/**"
  - "components/**"
  - "lib/**"
---

# Next.js

Server-first App Router.

## Components and data

- A component is a server component unless it needs state, effects or browser APIs. `'use client'` sits on the smallest leaf that needs it.
- Content and data live in `lib/` or `content/`, never inline in a page.
- Anything that talks to an external service goes through `lib/` and returns a result object with an `error` field instead of throwing.
- Mutations are `'use server'` actions, which client components call as functions.

## SEO and env

- A public page sets `metadata` with a title, a description and `alternates.canonical`.
- Images go through `next/image`.
- A new env key is declared in `.env.example` with an empty value.

## Review: passes every check, breaks at runtime

Check the diff for each of these and report a match, citing this file.

- A `'use client'` component importing a `server-only` module.
- A `'use client'` directive on a component that only renders props.
- A helper in `lib/` that throws or lets a fetch error escape.
- A new public page without a canonical.
- An env key read in code and missing from `.env.example`.
