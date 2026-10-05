# Proposal

## Why

The contact form validates and shows success, but the message goes nowhere. A visitor who writes in never reaches the owner.

## What Changes

- Deliver each valid message by email to `hello@hgirdzijauskas.lt` through Hostinger SMTP.
- Send from a dedicated mailbox, `form@hgirdzijauskas.lt`, so the server never holds the inbox password.
- Set the reply-to to the visitor's address, so a reply goes straight to them.
- Add an error state: a failed send shows a message and keeps what the visitor typed.
- Keep the honeypot: a bot submission still shows success and sends nothing.
- Cap the length of each field, so a direct POST cannot push a huge message through.
- Rate limit sends: 5 per IP in 10 minutes and 100 per day across the site.
- Run a local Mailpit server in the devcontainer, so development and end-to-end runs never send real email.
- Send no confirmation email to the visitor, so the form cannot be used to mail arbitrary addresses.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `contact-form`: each field has a length cap, sends are rate limited, a valid message is now delivered, a failed delivery has its own state, and the honeypot drops the message before delivery.

## Impact

- New dependencies: `nodemailer`, which ships its own types, and `rate-limiter-flexible`.
- New env keys: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `CONTACT_TO`.
- Changed: the contact action, the contact schema state, the form's status line and the contact copy.
- New: a mail helper in `lib/`, a Mailpit service in the devcontainer and a committed `.env.development`.
- Manual setup: create the `form@` mailbox on the Business Starter plan, check the server can reach Hostinger SMTP, and set the production env keys on the server.
- Prerequisite: archive `build-home-page` first, so `contact-form` exists in the main specs.
- Branch: `deliver-contact-form`, off `main`.
