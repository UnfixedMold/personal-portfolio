# contact-form Specification

## Purpose
The contact form a visitor fills in to start a project conversation, with its validation and result states. Delivery of the message is a later change.

## Requirements

### Requirement: The form asks for name, email and message

The contact form SHALL have three fields: name, email and a message asking what the visitor is building, plus a submit button labelled to send the message. Each field SHALL have an accessible label.

#### Scenario: A visitor sees the form

- **WHEN** a visitor reaches the contact section
- **THEN** they see the name, email and message fields and the send button

### Requirement: The form validates on the server

Submitting the form SHALL validate on the server: name and message are required, email is required and must be a valid address. The name SHALL be at most 100 characters, the email at most 254 and the message at most 5000. On failure the form SHALL show an error under each invalid field, keep the visitor's values and set the invalid state on the field. The errors SHALL come from the server result, not from browser validation popups, so they read the same with and without JavaScript.

#### Scenario: A visitor submits an empty form

- **WHEN** a visitor submits without filling anything in
- **THEN** they see an error under each field and nothing is sent

#### Scenario: A visitor mistypes the email

- **WHEN** a visitor submits with a name, a message and an email without a domain
- **THEN** they see an error under the email field and their name and message stay filled in

#### Scenario: A visitor writes too long a message

- **WHEN** a visitor submits a message longer than 5000 characters
- **THEN** they see an error under the message field, their text stays and nothing is sent

### Requirement: The form shows progress and success

While the submission is in flight the button SHALL show a pending state and the fields SHALL be disabled. After a valid submission is delivered the form SHALL be replaced by a sent panel with a title, a thank-you line and a send-another action. The panel SHALL be announced to screen readers and take focus. The send-another action SHALL bring back an empty form, with and without JavaScript.

#### Scenario: A visitor sends a valid message

- **WHEN** a visitor submits a name, a valid email and a message
- **THEN** they see the pending state and then the sent panel in place of the form

#### Scenario: A visitor sends another message

- **WHEN** a visitor on the sent panel chooses to send another message
- **THEN** they see the form again with empty fields

### Requirement: The form works without JavaScript

The form SHALL submit and show validation results as a normal page request when JavaScript is unavailable.

#### Scenario: A visitor has JavaScript disabled

- **WHEN** a visitor submits the form with JavaScript disabled
- **THEN** the page reloads with the validation result or the success message

### Requirement: The form deters bots

The form SHALL include a hidden honeypot field. A submission with the honeypot filled SHALL be treated as spam: it reaches the success state and no email is sent.

#### Scenario: A bot fills the hidden field

- **WHEN** a submission arrives with the honeypot filled
- **THEN** the form shows the success state and no email is sent

### Requirement: A valid message is delivered by email

A valid submission SHALL send one email to the owner's inbox. The email SHALL come from the site's own domain, carry the visitor's name, email and message as plain text, and set the reply-to to the visitor's email. The visitor SHALL receive no email.

#### Scenario: The owner receives the message

- **WHEN** a visitor submits a name, a valid email and a message
- **THEN** one email with that name, email and message arrives in the owner's inbox

#### Scenario: The owner replies to the visitor

- **WHEN** the owner replies to a delivered message
- **THEN** the reply is addressed to the visitor's email

#### Scenario: An invalid submission sends nothing

- **WHEN** a visitor submits a form that fails validation
- **THEN** no email is sent

### Requirement: A failed delivery shows an error

When the email cannot be sent the form SHALL show an error message that names the owner's email as a fallback, keep the visitor's values and stay enabled so they can try again. The error SHALL be announced to screen readers and SHALL NOT reveal technical details.

#### Scenario: The mail server is unavailable

- **WHEN** a visitor submits a valid message and the email cannot be sent
- **THEN** they see an error message with the owner's email and their name, email and message stay filled in

### Requirement: The form limits how often messages are sent

The form SHALL send at most 5 messages per visitor IP in 10 minutes and at most 100 messages per day across the site. Only send attempts SHALL count; invalid and spam submissions SHALL NOT. Over a limit the form SHALL show a try-again-later message, keep the visitor's values and send nothing.

#### Scenario: A visitor sends too many messages

- **WHEN** a visitor submits a sixth valid message within 10 minutes
- **THEN** they see a try-again-later message, their values stay and no email is sent

#### Scenario: The site reaches its daily cap

- **WHEN** a valid message arrives after 100 messages were sent that day
- **THEN** the visitor sees a try-again-later message and no email is sent
