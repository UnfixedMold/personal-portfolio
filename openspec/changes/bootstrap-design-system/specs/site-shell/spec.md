# Spec Delta

## Purpose

The root layout, the home page and the metadata every public page carries, so the site is up and themed before any section content exists.

## ADDED Requirements

### Requirement: The site answers at the root

The site SHALL serve a home page at `/` that renders the theme: the background, the font and the glow backdrop, with the page content width and gutters from the wireframes.

#### Scenario: A visitor opens the home page

- **WHEN** a visitor requests `/`
- **THEN** the site responds successfully and the visitor sees a themed page

### Requirement: Every public page carries metadata

Every public page SHALL set a title, a description and a canonical URL. The site title SHALL be the owner's name.

#### Scenario: A crawler reads the home page

- **WHEN** a crawler requests `/`
- **THEN** the response carries a title with the owner's name, a description and a canonical link to the page

### Requirement: The backdrop is decorative

The glow backdrop SHALL sit behind all content, SHALL not capture pointer events and SHALL not cause horizontal scrolling at any viewport width.

#### Scenario: A visitor views the page on a phone

- **WHEN** the viewport is 375px wide
- **THEN** the page has no horizontal scroll and the glows stay behind the content
