## MODIFIED Requirements

### Requirement: A sticky header frames every page

Every page SHALL show a header that stays at the top while scrolling, with a translucent blurred background. It SHALL show the brand mark as a link to the top of the page, navigation links to the services, experience and projects sections, and a primary call to action that leads to the contact section. The owner's name SHALL NOT appear in the header; the hero carries it. Below the large breakpoint the inline navigation SHALL be hidden, and a menu button SHALL take their place.

#### Scenario: A visitor scrolls the page

- **WHEN** a visitor scrolls down on a desktop viewport
- **THEN** the header stays visible at the top with the mark, the navigation and the call to action

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
- **THEN** the header shows the mark, the call to action and a closed menu button, and the section links are hidden

## ADDED Requirements

### Requirement: A menu holds the section links on narrow screens

Below the large breakpoint the header menu button SHALL open a panel under the header that lists the same section links as the desktop navigation. The button SHALL expose whether the panel is open. Choosing a link SHALL close the panel and scroll to that section. A click outside the panel, including the call to action, SHALL close it.

#### Scenario: A visitor opens the menu on a phone

- **WHEN** a visitor on a 375px viewport activates the menu button
- **THEN** the panel shows the Services, Experience and Projects links and the button reports it is expanded

#### Scenario: A visitor navigates from the menu

- **WHEN** a visitor on a 375px viewport opens the menu and chooses Experience
- **THEN** the panel closes and the experience heading sits in view below the header

#### Scenario: A visitor goes to contact with the menu open

- **WHEN** a visitor on a 375px viewport opens the menu and activates the call to action
- **THEN** the panel closes and the contact section is in view

#### Scenario: A visitor closes the menu with the button

- **WHEN** a visitor on a 375px viewport opens the menu and activates the button again
- **THEN** the panel closes and the button reports it is collapsed

#### Scenario: A desktop visitor sees no menu button

- **WHEN** the viewport is at least the large breakpoint wide
- **THEN** the menu button is hidden and the inline navigation shows
