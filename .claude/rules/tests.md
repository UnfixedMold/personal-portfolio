---
paths:
  - "tests/**"
  - "e2e/**"
---

# Tests

## Suites

| Suite    | Level      | Tool       | Talks to                 |
| -------- | ---------- | ---------- | ------------------------ |
| `tests/` | unit       | Vitest     | nothing                  |
| `e2e/`   | end to end | Playwright | the site, in the browser |

## Files and names

- One flat folder per suite. No subfolders by level or tool.
- One file per route, module or journey, named after it, ending in `.test.ts`.
- A test name or step title states the behaviour from the visitor's point of view, in their words.
- One spec scenario maps to one test named after it.
- A test file holds only tests. No helper functions, setup code or literals: they live in `support/` inside the suite's folder.

## Fixtures and page objects

- A Playwright page object is a class per page or flow, like `ContactPage`, holding its locators as `get` methods and the visitor's actions as verbs.
- `e2e/support/fixtures.ts` extends `test` with one fixture per page object, so a test asks for a fresh instance as a parameter; every Playwright test imports `test` and `expect` from it.
- Test data is a module of constants in `support/data.ts`.
- Setup that a suite repeats is a fixture or a `support/` helper, never a `beforeEach` in the test file.

## Structure

- Every test is Given-When-Then, three parts in that order, no comment markers.
- In Vitest the parts are blocks separated by blank lines.
- In Playwright each part is a `test.step` titled with it, so the report reads like the scenario.

## Assertions

- End to end asserts what the visitor sees: a visible text or element.
- Unit asserts what the function returns.
- A smoke test asserts only that the site is up and answers. A feature check is a journey in its own file.
- Never assert exact copy, markup, internal calls or implementation order.
- Never skip a test. A missing fixture fails the test with a message naming it.
