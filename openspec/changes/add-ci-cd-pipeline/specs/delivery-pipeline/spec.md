# Spec Delta

## Purpose

Checks every change before it reaches `main` and turns every commit on `main` into a published production image and a deploy.

## ADDED Requirements

### Requirement: Every change is checked

The `Check` job SHALL run on every pull request, every push to `main` and on manual dispatch. It SHALL fail when formatting, lint, typecheck, unit tests, end-to-end tests or the production build fail. It SHALL never rewrite files to make a check pass.

#### Scenario: A pull request has an unformatted file

- **WHEN** a pull request contains a file that Prettier would change
- **THEN** `Check` fails and names the file

#### Scenario: A pull request breaks an end-to-end journey

- **WHEN** a pull request makes a Playwright journey fail
- **THEN** `Check` fails and the Playwright report is attached to the run for seven days

#### Scenario: A clean pull request

- **WHEN** a pull request passes every check
- **THEN** `Check` succeeds and no image is published

### Requirement: Main merges only after Check passes

A pull request into `main` SHALL be mergeable only when `Check` succeeded on its head commit.

#### Scenario: Check fails on a pull request

- **WHEN** `Check` failed on the head commit of a pull request
- **THEN** GitHub blocks the merge

### Requirement: Main publishes the production image

After `Check` succeeds on a push to `main` or a manual dispatch, CI SHALL build the production image and push it to `ghcr.io/unfixedmold/protfolio`. Each push SHALL carry two tags: `latest` and `sha-<7 character commit sha>`. A pull request SHALL never publish an image.

#### Scenario: A pull request merges into main

- **WHEN** a squash merge lands on `main` and `Check` passes
- **THEN** the registry holds an image tagged `sha-<short sha>` for that commit and `latest` points to it

#### Scenario: Check fails on main

- **WHEN** `Check` fails on a push to `main`
- **THEN** no image is published and `latest` stays on the previous image

### Requirement: The image serves the site

The image SHALL start the production server on port 3000 without installing anything at start. It SHALL serve the pages, the static assets and the `public` files. It SHALL read server env such as the SMTP keys at runtime and contain no secret.

#### Scenario: The image starts

- **WHEN** the image runs with port 3000 published
- **THEN** the home page answers with status 200 and its styles and images load

#### Scenario: Runtime env

- **WHEN** the image runs with `CONTACT_TO` set in its env
- **THEN** the contact form delivers to that address without a rebuild

### Requirement: A published image triggers the deploy

After the image is published, CI SHALL dispatch the `deploy.yml` workflow in the deploy repo with the `sha-` tag and a run name of `protfolio: <commit subject> (<short sha>)`. When no deploy repo is configured, CI SHALL skip the trigger and the run SHALL still succeed.

#### Scenario: The deploy repo is configured

- **WHEN** an image is published and the deploy repo is configured
- **THEN** a deploy run starts in the deploy repo for that `sha-` tag

#### Scenario: The deploy repo is not configured yet

- **WHEN** an image is published and no deploy repo is configured
- **THEN** the deploy trigger is skipped and the workflow run is green
