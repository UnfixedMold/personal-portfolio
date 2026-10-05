# home-page Specification

## Purpose
The sections of the one-page portfolio and the content they show, so a visitor learns who the owner is, what they build, how they work and what they have built.

## Requirements

### Requirement: The hero introduces the owner

The home page SHALL open with a hero that shows the owner's name and city, a headline stating that the owner loves to build AI apps, ML models and web apps end to end, and a one-line pitch. The headline word for what the owner builds SHALL rotate through the three options. Without JavaScript or with reduced motion, the hero SHALL show the first option and stay legible.

#### Scenario: A visitor lands on the page

- **WHEN** a visitor opens `/`
- **THEN** they see the owner's name, the city, the headline and the pitch above the fold

#### Scenario: The headline word rotates

- **WHEN** the visitor watches the hero for a few seconds
- **THEN** the headline word changes through AI apps, ML models and web apps and returns to the first

#### Scenario: The visitor prefers reduced motion

- **WHEN** the browser reports a reduced motion preference
- **THEN** the hero shows the first headline word and no entrance or word animation plays

### Requirement: The services section lists what the owner builds

The home page SHALL show a section reachable at `#services`, titled for what the owner builds, with three service cards. Each card SHALL show a glyph, a title, a description, example use cases and a list of stack tags.

#### Scenario: A visitor reads the services

- **WHEN** a visitor reaches the services section
- **THEN** they see three cards for web and mobile apps, AI applications and ML models, each with its examples and stack tags

#### Scenario: The services stack on a phone

- **WHEN** the viewport is 375px wide
- **THEN** the three cards stack in one column with no horizontal scroll

### Requirement: The method section explains how the owner works

The home page SHALL show a section reachable at `#method` with four numbered steps: spec, plan, build and verify, each with a title and a sentence.

#### Scenario: A visitor reads the method

- **WHEN** a visitor reaches the method section
- **THEN** they see four numbered steps in order from spec to verify

### Requirement: The experience and education section shows the owner's history

The home page SHALL show a section reachable at `#experience` with the owner's jobs, newest first, each with its role, period and organisation. The jobs SHALL work as an accordion: exactly one job is expanded at a time and shows its highlights and stack tags. The newest job SHALL be expanded by default. Pointing at a job or activating it SHALL expand it, and the last pointed job SHALL stay expanded after the pointer leaves. A keyboard user SHALL be able to expand any job. Next to the jobs it SHALL show the university with its logo and both degrees with their periods, and a thesis awards card with a medal, the place and the label for each award.

#### Scenario: A visitor reads the experience

- **WHEN** a visitor reaches the experience section
- **THEN** they see every job with its role, period and organisation, newest first, and the newest job's highlights and tags

#### Scenario: A visitor expands a job

- **WHEN** a visitor activates a collapsed job
- **THEN** its highlights and tags show and the previously expanded job collapses

#### Scenario: A visitor points at a job

- **WHEN** a visitor points at a collapsed job and then moves the pointer away
- **THEN** that job stays expanded and the newest job stays collapsed

#### Scenario: A keyboard user expands a job

- **WHEN** a keyboard user focuses a collapsed job and presses Enter
- **THEN** that job expands

#### Scenario: A visitor reads the education

- **WHEN** a visitor reaches the education section
- **THEN** they see the university logo and name, both degrees with their periods, and both awards with their places

### Requirement: The projects section links to the live side projects

The home page SHALL show a section reachable at `#work` with one card per side project. Each card SHALL show the screenshot when the project has one and a skeleton placeholder in the image slot when it does not, then the title, a type badge, a description, what the project demonstrates and the live site's domain. The whole card SHALL open the live site in a new tab.

#### Scenario: A visitor opens a project

- **WHEN** a visitor activates a project card
- **THEN** the live site opens in a new tab

#### Scenario: A project has no screenshot yet

- **WHEN** a project has no screenshot image
- **THEN** the card shows a skeleton placeholder where the screenshot will go, and the rest of the card renders as usual

#### Scenario: A screenshot is added

- **WHEN** a screenshot is added to a project's content entry
- **THEN** the card shows the screenshot in place of the skeleton without a component change

### Requirement: The contact section gives every way to reach the owner

The home page SHALL show a section reachable at `#contact` with an invitation to get in touch, the email as a mail link, the phone as a call link, the LinkedIn profile as a link opening in a new tab, and the contact form.

#### Scenario: A visitor wants to reach out

- **WHEN** a visitor reaches the contact section
- **THEN** they see the email, phone and LinkedIn links and the form

#### Scenario: The header call to action leads to contact

- **WHEN** a visitor activates the header's call to action
- **THEN** the page scrolls to the contact section

### Requirement: Content lives in one place

Every text, list, link and contact detail shown on the page SHALL come from content config modules, so a change of copy is a change of data. Components SHALL hold no literal copy, link, phone number or email. The same content modules SHALL feed the structured data and the social metadata. Placeholder values, like the phone number, SHALL be config entries the owner replaces.

#### Scenario: A job is added

- **WHEN** a job is added to the experience content
- **THEN** it appears in the experience section and in the structured data without a component change

#### Scenario: A job's highlights are edited

- **WHEN** a job's highlights or tags change in the experience content
- **THEN** the expanded job shows the new highlights and tags without a component change

#### Scenario: The phone number is replaced

- **WHEN** the phone number in the site config changes
- **THEN** the contact section and the structured data show the new number without a component change

### Requirement: The page reads well on a phone

Every section SHALL reflow to one column on a phone. Cards SHALL keep their content readable, and the page SHALL have no horizontal scroll.

#### Scenario: A visitor scrolls the full page on a phone

- **WHEN** the viewport is 375px wide and the visitor scrolls to the footer
- **THEN** every section is visible in one column and the page has no horizontal scroll
