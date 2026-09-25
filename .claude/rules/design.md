---
paths:
  - "app/**"
  - "components/**"
---

# Design

Applies to every page and component.

## Follow the common pattern

- Do what well-known portfolio sites do for the same screen. A visitor should never have to learn this site.
- Look at the pages already in the app before designing one. A new page copies the closest existing page's layout, spacing and tone.
- The same kind of screen looks the same everywhere. An empty state or an error looks like the ones already in the app.
- `wireframes.html` at the root is the reference for layout and content until the pages exist.

## Reuse

- Reuse in this order: a shared component in `components/`, a shadcn primitive in `components/ui/`, a shadcn primitive not yet added, then a new component.
- A shadcn primitive is added through the shadcn CLI, never hand-written.

## Review: looks fine, does not belong

Check the diff for each of these and report a match, citing this file.

- A primitive used directly, or a hand-written one, when a shared component or a shadcn primitive already covers it.
- A page whose layout, heading or spacing differs from the nearest existing page without a reason in the change.
