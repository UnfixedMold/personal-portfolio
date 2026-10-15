# Design

## Context

- `components/education.tsx` is a server component. `AwardPanel` renders a medal, the place, the label and the thesis in a rounded muted box.
- `lib/content/education.ts` types `Award` as place, label, thesis and medal; the thesis title goes, it is clutter the certificate already shows. The university logo is a static import rendered through `next/image`.
- `radix-ui` is installed. `components/ui/` holds Collapsible and Accordion, no Dialog.
- Unit tests render a component with `tests/support/render.ts` and query by role. Playwright journeys use a page object per section from `e2e/support/fixtures.ts`.

## Goals / Non-Goals

**Goals:**

- One dialog pattern a visitor already knows: open, look, Escape or click away.
- Keep the education card a server component with one small client leaf.
- The photo goes through the same image pipeline as every other image.

**Non-Goals:**

- A gallery with several photos per award or arrows between awards.
- A dedicated awards page or a shareable URL for a photo.
- Hosting the photos outside the repo.

## Decisions

### Dialog over a new tab or a page

- Add the shadcn Dialog through the CLI. It gives the overlay, the focus trap, Escape, outside click, the close button and focus return.
- A link to the image file leaves the site with no caption and no way back on a phone.
- A route per award is more surface than two photos justify.

### One client leaf

- A new `components/award-dialog.tsx` is `'use client'` and holds the Dialog with the panel as `DialogTrigger` and the photo as content.
- The medal and the copy stay in `education.tsx` and are passed in as the trigger's children, so they do not move.
- The trigger is the Dialog's own `button`, styled as the panel, with a focus ring and a hover state.
- `asChild` is out: a server-rendered child reaches the client as a lazy node while it streams, and the slot rejects it.

### Affordance

- The panel shows a small `Image` icon from lucide and the text "View photo" on the right, muted, from a content string next to the award.
- Hover and focus raise the panel's background one step, matching the job accordion rows.

### Images grouped by section

- `assets/images/` gets one folder per section that owns several images: `education/` for the university logo and the award photos, `projects/` for the screenshots.
- `logo.svg` stays at the root; it belongs to no section and the README links to it.
- A flat folder with seven images mixes sections, and a lone `awards/` folder would split education in two.

### Photo content

- `Award` gains `photo: StaticImageData` and `photoLabel: string`. The label is the alt text and names the award in the photo.
- The photos live in `assets/images/education/` next to the university logo, resized to at most 1600px on the long edge and saved as WebP under roughly 300KB each.
- The dialog renders the photo with `next/image` and `sizes` tied to the dialog width, so a phone downloads a small variant.

### Tests

- A unit test in `tests/education.test.ts` renders `Education` with the test content and asserts a button per award with the award place in its name, and that activating one shows a dialog with the photo.
- `tests/support/content.ts` gives each test award a photo and a label.
- An `Education` page object in `e2e/support/education.ts` exposes the award button, the dialog and open and close actions. One journey per scenario in `e2e/education.test.ts`.

## Risks / Trade-offs

- [The dialog's close button and the award trigger both read as buttons in the card] → The trigger's accessible name holds the award place and label; the close button is named "Close".
- [A large photo slows the page] → The photo is lazy and only requested when the dialog opens; WebP under 300KB bounds the cost.
- [The accessibility journey flags a dialog without a title] → The caption is the `DialogTitle`, so every dialog has one.
