# site-shell Specification

## Purpose

The root layout, header, footer and metadata every public page carries, so each page is themed and framed the same way.

## Requirements

### Requirement: A sticky header frames every page

Every page SHALL show a header that stays at the top while scrolling, with a translucent blurred background. It SHALL show the brand mark as a link to the top of the page, the owner's name, navigation links to the services, experience and projects sections, and a primary call to action that leads to the contact section. On a phone only the brand mark, the owner's first name and the call to action SHALL remain.

#### Scenario: A visitor scrolls the page

- **WHEN** a visitor scrolls down on a desktop viewport
- **THEN** the header stays visible at the top with the mark, the name, the navigation and the call to action

#### Scenario: A visitor navigates from the header

- **WHEN** a visitor activates the Experience link in the header
- **THEN** the page scrolls to the experience section and its heading sits below the header

#### Scenario: A visitor returns to the top from the header

- **WHEN** a visitor went down to a section and activates the brand mark
- **THEN** the page scrolls back to the top

#### Scenario: A visitor returns to the contact section from the header

- **WHEN** a visitor activates the call to action, scrolls back to the top and activates it again
- **THEN** the page scrolls to the contact section again

#### Scenario: A visitor opens the page on a phone

- **WHEN** the viewport is 375px wide
- **THEN** the header shows the mark, the first name and the call to action, and the navigation is hidden

### Requirement: A footer closes every page

Every page SHALL end with a footer showing the copyright with the current year and the owner's name.

#### Scenario: A visitor reaches the bottom

- **WHEN** a visitor scrolls to the end of the page
- **THEN** they see the copyright line with the current year and the owner's name

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
