# Design

## Context

- The form, its schema and its action exist from `build-home-page`. See proposal.md for why delivery is needed now.
- `parseContact` returns the same `success` state for a valid message and for spam, with the values cleared. The action cannot tell them apart, so the result shape has to change.
- `ContactState.status` is `idle` or `success`. The form's `aria-live` line shows only the success text.
- The owner is on Hostinger Business Starter: unlimited mailboxes, 1000 sent and 1000 received per mailbox per day.
- Hostinger SMTP is `smtp.hostinger.com`, port 465 with SSL or 587 with STARTTLS, logged in with the full address.
- Hostinger's docs do not say the `From` must match the login, but "553 sender address rejected" reports are common. Sending from the logged-in mailbox avoids it.
- The site runs on the owner's own server, a single Node.js process behind Caddy. Its logs already go to Loki with Grafana on top.
- Caddy's `reverse_proxy` sets `X-Forwarded-For` to the real client IP and drops a client-sent one by default.
- Server Actions run on the Node.js runtime. The edge runtime is deprecated, and nodemailer needs Node's `net` and `tls` anyway.
- A Server Action is reachable by a direct POST. Next checks the Origin header against the host, which stops CSRF, but a script can set any Origin.
- The Server Action body limit is 1 MB by default.
- Env keys without `NEXT_PUBLIC_` are read on the server at runtime and never reach the browser.
- Next.js loads `.env.development` under `next dev`, and its docs allow committing it. Playwright's web server runs `next dev`, so it reads the same file.
- `nodemailer` 10 is TypeScript with bundled types and needs Node 20 or newer. It is pure JavaScript, so it should bundle without `serverExternalPackages`.

## Goals / Non-Goals

**Goals:**

- One send path: the action validates, builds the email, sends it and maps the outcome to a state.
- Development and end-to-end runs reach Mailpit, never Hostinger.
- A slow or broken mail server returns the error state within seconds, not after the default two minutes.

**Non-Goals:**

- Turnstile, a CAPTCHA or any shared rate limit store such as Redis.
- An HTML email template or React Email.
- A confirmation email to the visitor.
- Retries or a queue. A failed send is the visitor's to retry.

## Decisions

### Mail transport

- **`nodemailer` over SMTP**, in `lib/contact/mailer.ts`. `sendContactMail(values)` reads env, builds a transport on each call and sends one message. No pooling.
- `secure` is true when the port is 465. Auth is passed only when `SMTP_PASSWORD` is set, because Mailpit has no auth.
- Connection, greeting and socket timeouts are 10 seconds each.
- It returns `{ error }` instead of throwing, per the project rule for external services. A missing env key lands in `error` too, so a misconfigured server shows the error state.
- Version 10 ships its own types, so there is no `@types/nodemailer`.
- Alternative considered: Resend. Rejected by the owner in favour of the existing Hostinger mailbox and no new service.

### Email content

- **A pure `getContactMail(values, config)`** in `lib/contact/mail.ts` returns the message: from `Portfolio <SMTP_USER>`, to `CONTACT_TO`, reply-to the visitor's name and email, subject `New message from <name>`, a plain text body with name, email and message.
- Plain text only, so visitor input is never rendered as HTML. Nodemailer encodes headers, so a newline in the name cannot inject a header.
- The from address is the authenticated mailbox, because Hostinger rejects anything else.

### Result shape

- **Length caps in the zod schema**: name 100 characters, email 254, message 5000. The errors come from `lib/content/contact.ts` like the others.
- **`parseContact` returns an outcome** with a `kind` of `spam`, `invalid` with values and errors, or `valid` with the trimmed values. It stays pure and stops building `ContactState`.
- **`deliverContact(formData, ip)` in `lib/contact/delivery.ts` maps the outcome**: `spam` gives `success` with nothing sent, `invalid` gives `idle` with errors, `valid` sends and gives `success` or `error` with the values kept.
- The `'use server'` action only reads the IP and calls `deliverContact`. Keeping the logic out of the action file keeps it off the public action surface and lets unit tests pass an IP.
- The action logs the caught error with `console.error` under a fixed `contact-form: send failed` prefix and returns no detail to the client. Loki picks the line up, and a Grafana alert on that prefix tells the owner a message was lost.
- `ContactState.status` gains `error` and `limited`.
- Alternative considered: a separate `isSpam` helper next to `parseContact`. Rejected, two functions would read the same form data for one decision.

### Rate limit

- **`rate-limiter-flexible` with two `RateLimiterMemory` limiters** in `lib/contact/rate-limit.ts`: 5 points per IP over 600 seconds, and 100 points on one site-wide key over 86400 seconds.
- The action consumes a point from both only on a `valid` outcome, right before sending. Spam and invalid submissions never touch the limiters.
- Over either limit the action returns a new `limited` status with the values kept. The form shows `form.limited` from `lib/content/contact.ts`.
- The IP is the first entry of `X-Forwarded-For`, read through `headers()` from `next/headers`. A missing header falls back to one shared `unknown` key.
- The limits come from `CONTACT_LIMIT_PER_IP` and `CONTACT_LIMIT_PER_DAY`, defaulting to 5 and 100. `.env.development` sets both to 1000, so parallel end-to-end runs from one IP never trip them.
- In memory is enough for one process. A restart resets the counters, which is acceptable.
- Alternative considered: a Caddy rate limit. Rejected, it needs a plugin, a rule for `POST /` that spares `GET /`, and it cannot show a message in the form.
- Alternative considered: a hand-written counter map. Rejected, the library already handles windows and expiry.

### Form

- **On success a sent panel replaces the form**, the common pattern for portfolio contact forms. It shows a check in a GradientTile, the title, a thank-you line and a "Send another message" button. The title takes focus and the panel is a `role="status"` region.
- "Send another" remounts the form through a `key`, so `useActionState` starts fresh. The button sits in a `method="get"` form to `/#contact`, so without JavaScript it reloads an empty form.
- Errors and the rate limit stay a destructive shadcn `Alert` under the form, so the visitor keeps their text to retry. The Alert sits inside the existing `role="status"` region, because the e2e suite reads `role="alert"` as field errors.

- The error text names the owner's email. `lib/content/contact.ts` carries it as `email` from the site config, and `Contact` passes it to `ContactForm` as a prop.
- The status line is its own `ContactAlert` in `components/contact/alert.tsx` component, so a unit test renders each state without submitting.
- Fields and button stay enabled after an error, with the values from the state.

### Configuration

| Key             | Production               | Development              |
| --------------- | ------------------------ | ------------------------ |
| `SMTP_HOST`     | `smtp.hostinger.com`     | `mailpit`                |
| `SMTP_PORT`     | `465`                    | `1025`                   |
| `SMTP_USER`     | `form@hgirdzijauskas.lt` | `form@hgirdzijauskas.lt` |
| `SMTP_PASSWORD` | the mailbox password     | unset                    |
| `CONTACT_TO`    | `hello@hgirdzijauskas.lt`| `hello@hgirdzijauskas.lt`|
| `CONTACT_LIMIT_PER_IP`  | unset, 5           | `1000`                   |
| `CONTACT_LIMIT_PER_DAY` | unset, 100         | `1000`                   |

- `.env.development` holds the development column and is committed, with a `!.env.development` line in `.gitignore`.
- `.env.example` lists every key with an empty value, per the project rule. An empty limit falls back to its default.
- Production values live in the server's runtime env, next to how the app is started there. The password never enters the repo.

### Local mail server

- **Mailpit** as a service in `.devcontainer/docker-compose.yml`, image `axllent/mailpit`, SMTP on 1025, web UI on `127.0.0.1:8025`.
- The app container reaches it as `mailpit`. The owner reads test mail in the web UI.

### Tests

- Unit: `getContactMail` returns the right to, from, reply-to and body. `parseContact` returns each outcome.
- Unit: `deliverContact` with SMTP pointed at closed port 1 on localhost returns `error` with the values kept. No mocks, and nothing leaves the machine.
- End to end: a `Mailbox` fixture reads Mailpit's HTTP API, at `MAILPIT_URL` or `http://mailpit:8025` by default. Each journey uses a unique name from `support/data.ts`, so parallel runs never see each other's mail.
- End to end: a valid submit arrives with the visitor's details and reply-to. An invalid submit leaves no message with its name.
- Unit: `deliverContact` with fresh modules returns `limited` on the sixth valid send from one IP and after a daily cap stubbed to 2.
- The failed-send scenario is unit only. A broken mail server cannot be forced inside a shared `next dev`.

## Risks / Trade-offs

- [The server's provider blocks outbound SMTP ports, as Hetzner and DigitalOcean do on new accounts] → Check with `nc -vz smtp.hostinger.com 465` from the server before the first deploy. Port 587 is the fallback, set by env alone; otherwise ask the provider to unblock.
- [The 1000 per day cap on `form@`] → Far above a contact form's volume. The error state covers a refusal, and the cap is per mailbox, so `hello@` keeps its own.
- [A leaked `form@` password lets someone send as the domain] → The mailbox does nothing else. Rotate the password in Hostinger.
- [The app port is reachable without Caddy, so a bot can fake `X-Forwarded-For`] → Bind the app to localhost or the Docker network only.
- [A bot rotating IPs] → The daily cap bounds it at 100 emails. Turnstile is a later change.
- [Mailpit not running locally] → A valid submit shows the error state, which points straight at it.

## Migration Plan

- Create the `form@hgirdzijauskas.lt` mailbox in Hostinger.
- Run `nc -vz smtp.hostinger.com 465` on the server and confirm it connects.
- Confirm the app port is not reachable from outside, only through Caddy.
- Set the five env keys in the server's runtime env, then deploy.
- Add a Grafana alert on the `contact-form: send failed` log line.
- Send one real message from the live site and check it lands in `hello@`.
- Rollback: revert the merge. The form goes back to validating without sending.
