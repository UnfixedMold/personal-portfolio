# Spec Delta

## Purpose

The contact form a visitor fills in to start a project conversation, with its validation and result states. Delivery of the message is a later change.

## ADDED Requirements

### Requirement: The form asks for name, email and message

The contact form SHALL have three fields: name, email and a message asking what the visitor is building, plus a submit button labelled to send the message. Each field SHALL have an accessible label.

#### Scenario: A visitor sees the form

- **WHEN** a visitor reaches the contact section
- **THEN** they see the name, email and message fields and the send button

### Requirement: The form validates on the server

Submitting the form SHALL validate on the server: name and message are required, email is required and must be a valid address. On failure the form SHALL show an error under each invalid field, keep the visitor's values and set the invalid state on the field. The errors SHALL come from the server result, not from browser validation popups, so they read the same with and without JavaScript.

#### Scenario: A visitor submits an empty form

- **WHEN** a visitor submits without filling anything in
- **THEN** they see an error under each field and nothing is sent

#### Scenario: A visitor mistypes the email

- **WHEN** a visitor submits with a name, a message and an email without a domain
- **THEN** they see an error under the email field and their name and message stay filled in

### Requirement: The form shows progress and success

While the submission is in flight the button SHALL show a pending state and the fields SHALL be disabled. After a valid submission the form SHALL show a success message, clear the fields and return to the idle state. This change delivers nothing: a valid submission reaches the success state without sending the message anywhere.

#### Scenario: A visitor sends a valid message

- **WHEN** a visitor submits a name, a valid email and a message
- **THEN** they see the pending state and then a success message with cleared fields

### Requirement: The form works without JavaScript

The form SHALL submit and show validation results as a normal page request when JavaScript is unavailable.

#### Scenario: A visitor has JavaScript disabled

- **WHEN** a visitor submits the form with JavaScript disabled
- **THEN** the page reloads with the validation result or the success message

### Requirement: The form deters bots

The form SHALL include a hidden honeypot field. A submission with the honeypot filled SHALL be treated as spam: it reaches the success state and is dropped.

#### Scenario: A bot fills the hidden field

- **WHEN** a submission arrives with the honeypot filled
- **THEN** the form shows the success state and no message is processed
