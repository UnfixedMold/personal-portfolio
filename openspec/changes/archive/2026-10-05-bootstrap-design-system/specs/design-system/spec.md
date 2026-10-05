# Spec Delta

## Purpose

The theme tokens, primitives and shared components every page of the portfolio is built from, so all pages look like the wireframes and like each other.

## ADDED Requirements

### Requirement: The theme matches the wireframes

The site SHALL render with the wireframe palette, type and radius: a near-white lavender background, near-black text, a purple accent and its gradient, a soft lavender surface for pills and tiles, the Plus Jakarta Sans font, rounded inputs and pill buttons. Every color, radius and font SHALL be defined once as a theme variable and read from there.

#### Scenario: A component uses the theme

- **WHEN** a primitive or shared component renders
- **THEN** its colors, radius and font come from the theme variables, not from literal values in the component

#### Scenario: The font is self-hosted

- **WHEN** a visitor opens any page
- **THEN** the page renders in Plus Jakarta Sans without a request to a third-party font host

### Requirement: The primary button is a gradient pill

The site SHALL offer one primary call-to-action button style: a purple gradient, white text, fully rounded, that lifts on hover.

#### Scenario: A primary button renders

- **WHEN** a page renders a primary button
- **THEN** the visitor sees a fully rounded purple gradient button with white text

### Requirement: Shared building blocks exist

The site SHALL provide reusable building blocks for what the wireframe repeats: a page section with a centered heading and subtitle, a gradient tile holding a glyph or number, a white surface card that lifts on hover, and a small purple tag pill.

#### Scenario: A section with a heading renders

- **WHEN** a page renders a section with a title and a subtitle
- **THEN** the visitor sees the title and subtitle centered above the section content, within the page's content width

#### Scenario: A gradient tile renders its content

- **WHEN** a page renders a gradient tile with a glyph or a number
- **THEN** the visitor sees that content in white on a purple gradient square

#### Scenario: A tag pill renders its label

- **WHEN** a page renders a tag pill with a label
- **THEN** the visitor sees the label in purple on a lavender pill

#### Scenario: A surface card renders its content

- **WHEN** a page renders a surface card
- **THEN** the visitor sees its content on a white rounded card with a faint purple border
