# Proposal

## Why

- The thesis awards in the education card are text only, and the owner has photos of each award to back them up.
- A visitor who wants proof has nowhere to click today.

## What Changes

- Each award panel in the education card becomes a button that opens a dialog with a photo of the award.
- The dialog shows the photo with the award place and label as its caption and closes on Escape, the close button or a click outside it.
- The panel shows a visible hint that it opens a photo and drops the thesis title; the photo shows it.
- The photos live in the repo and ship with the site; nothing is hosted elsewhere.
- Work happens on the branch `award-photo-dialog`.

## Capabilities

### New Capabilities

### Modified Capabilities

- `home-page`: the education section’s award panels open a photo dialog and lose the thesis title, each degree shows its graduation year instead of a period, and the award photo is a content entry.

## Impact

- `assets/images/` is grouped by section: `education/` and `projects/`, with the brand logo staying at the root.
- `lib/content/education.ts` gains a `photo` field on `Award`, imported from `assets/images/education/`.
- `components/education.tsx` wraps each award panel in a client leaf that opens the dialog.
- A shadcn Dialog primitive is added under `components/ui/`.
- `tests/` gains a unit test for the education component and `e2e/` gains an education journey.
