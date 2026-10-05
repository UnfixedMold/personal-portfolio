# Design

## Context

- `components/site-header.tsx` is a server component. The inline nav shows from `lg` up and the name falls back to the short name below `sm`.
- The wireframe header now has a three-bar button that turns into an X. It opens a full-width panel under the 76px header that grows open and fades its links in.
- Each panel row is at least 56px tall, 20px bold, with a primary arrow on the right and a divider between rows.
- The wireframe switches at 820px. The repo uses `lg`, so the menu shows below `lg`, where the inline nav hides today.
- The e2e `Header` page object finds the home link by the short name, which the hidden name no longer provides.

## Goals / Non-Goals

**Goals:**

- Match the wireframe panel, button and animation with theme tokens.
- Keep the header a server component with one small client leaf.

**Non-Goals:**

- Closing on Escape or on scroll. The wireframe has none.
- A focus trap or a scroll lock. The panel is a disclosure, not a modal.
- The project screenshot changes in the wireframe.

## Decisions

### Collapsible over Sheet or a hand-written toggle

- Add the shadcn Collapsible through the CLI. It is a disclosure that sets `aria-expanded` and `aria-controls` for us.
- Sheet is a modal drawer from the side, which the wireframe does not draw.
- A hand-written toggle repeats what the primitive already gives.

### One client leaf

- A new `components/mobile-nav.tsx` holds the Collapsible with a controlled `open` state.
- It renders the button and the panel and closes on a link click.
- A document click listener closes it on any click outside it, such as the call to action.
- `site-header.tsx` stays a server component and passes `site.nav` in.
- The Collapsible root wraps the button and the panel. The sticky header is the containing block, so the panel sits at `top-full`, full width.

### Animation

- The panel uses the `animate-collapsible-down` and `animate-collapsible-up` utilities from tw-animate-css, already imported, which read the Radix content height.
- The links fade in with `animate-in fade-in-0`.
- Radix unmounts the closed panel, so its links leave the tab order without extra work.
- The panel background is the solid page background. The wireframe's 97% alpha let the large hero heading show through.
- The three bars are spans with transforms keyed on the trigger's `data-state`. `motion-reduce` turns the motion off.

### Name and home link

- The name leaves the header at every width, so the home link holds only the brand mark.
- The home link gets `aria-label={site.name}` so it keeps an accessible name without visible text. The page object still matches the short name inside it.

### Tests

- The phone scenario asserts the menu button is visible and the inline nav is hidden.
- The `Header` page object gains `menuButton`, `menu` and `openMenu`.
- The menu journeys live in `e2e/header.test.ts`, one test per scenario.

## Risks / Trade-offs

- [Two navigation landmarks in the DOM] → Label them "Sections" and "Menu" so they stay distinct; only one is visible at a width.
