# Proposal

## Why

- Below the `lg` breakpoint the header hides the section links, so phone and tablet visitors cannot jump to a section.
- The updated wireframes now draw a mobile menu, which reverses the "no mobile menu" non-goal of the home page change.

## What Changes

- A menu button appears in the header below `lg`, after the call to action.
- The button opens a panel under the sticky header that lists the section links.
- Choosing a link closes the panel and scrolls to the section.
- The owner's name leaves the header at every width; the hero still shows it.
- The project screenshots also changed in the wireframe but are out of scope.
- Work happens on the branch `add-mobile-nav`.

## Capabilities

### New Capabilities

### Modified Capabilities

- `site-shell`: the header shows a menu on narrow screens instead of dropping the navigation, and drops the name.

## Impact

- `components/site-header.tsx` gains the menu and a client leaf for its open state.
- A shadcn Collapsible primitive is added under `components/ui/`.
- The header journeys in `e2e/` change for the phone and gain menu scenarios.
