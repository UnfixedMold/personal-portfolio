# Tasks

## 1. Setup

- [x] 1.1 Create the branch `deliver-contact-form` from `main` after `build-home-page` is archived. Read `02-guides/environment-variables.md` and `03-api-reference/05-config/01-next-config-js/serverExternalPackages.md` under `node_modules/next/dist/docs/01-app/`, and the nodemailer 10 SMTP transport docs. Verify the Mail transport and Configuration decisions in design.md against them, and update design.md where they differ.
- [x] 1.2 Run `pnpm add nodemailer rate-limiter-flexible`. Verify `pnpm typecheck` and `pnpm build` pass with no `serverExternalPackages` entry and no `@types/nodemailer`.
- [x] 1.3 Add the Mailpit service to `.devcontainer/docker-compose.yml`, commit `.env.development` with the development column, add `!.env.development` to `.gitignore` and list every key in `.env.example`. Verify after a container rebuild that `http://localhost:8025` shows the Mailpit inbox.

## 2. Sending

- [x] 2.1 Change `parseContact` in `lib/contact/schema.ts` to return a `spam`, `invalid` or `valid` outcome, add the length caps with their messages in `lib/content/contact.ts`, add `error` to `ContactState.status`, and map the outcomes in the action without sending yet. Verify unit tests assert each outcome for a filled honeypot, an empty form, an invalid email, an over-long message and valid input.
- [x] 2.2 Add `lib/contact/mail.ts` with the pure `getContactMail(values, config)`. Verify unit tests assert the from is the mailbox, the to is the inbox, the reply-to is the visitor and the body holds the name, email and message.
- [x] 2.3 Add `lib/contact/mailer.ts` with `sendMail(message)`: transport from env, `secure` on port 465, auth only with a password, 10 second timeouts, a throw on a missing key. Verify `pnpm typecheck` passes.
- [x] 2.4 Send from the action on a `valid` outcome and return `error` with the values kept when `sendMail` throws, logging it under the `contact-form: send failed` prefix. Verify a unit test with `lib/contact/mailer` mocked to reject asserts the error state and the kept values.
- [x] 2.5 Add `lib/contact/rate-limit.ts` with the per-IP and daily `RateLimiterMemory` limiters from env, consume both in the action before sending, and return `limited` with the values kept when either refuses. Add the two keys to `.env.development` and `.env.example`. Verify unit tests assert `limited` on the sixth send from one IP and after the daily cap, and that invalid and spam submissions never count.

## 3. Form

- [x] 3.1 Add `form.error` and `form.limited` to `lib/content/contact.ts`, pass the owner's email to `ContactForm` from the site config, and show the error in the status line in the destructive color. Verify a unit test renders the form in the error state with test data and asserts the error with the email, and the limited message, from that data are visible.

## 4. Journeys

- [x] 4.1 Add a `Mailbox` fixture in `e2e/support/` that finds a message in Mailpit by sender name, and unique names in `support/data.ts`. Verify the existing contact form journeys still pass with Mailpit running.
- [x] 4.2 Add the journeys: a valid submit arrives in the inbox with the visitor's details, the delivered message replies to the visitor, an invalid submit leaves no message, a message over 5000 characters shows an error and keeps the text. Verify `pnpm test:e2e` passes.

## 5. Release

- [ ] 5.1 Create the `form@hgirdzijauskas.lt` mailbox in Hostinger, run `nc -vz smtp.hostinger.com 465` on the server, confirm the app port is reachable only through Caddy, set the production env keys in the server's runtime env and add the Grafana alert on `contact-form: send failed`. This is the owner's step. Verify a message sent from the live site lands in `hello@hgirdzijauskas.lt` with the visitor as reply-to.
