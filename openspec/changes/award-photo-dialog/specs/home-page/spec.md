## ADDED Requirements

### Requirement: An award opens a photo of it

Each thesis award in the education card SHALL be a button that opens a dialog showing a photo of the award. The panel SHALL show a visible hint that it opens a photo. The dialog SHALL show the award place and label as the photo's caption and SHALL close on Escape, on its close button and on a click outside it. While the dialog is open, focus SHALL stay inside it, and on close focus SHALL return to the award.

#### Scenario: A visitor opens an award photo

- **WHEN** a visitor activates an award in the education card
- **THEN** a dialog shows the award photo with the award place and label

#### Scenario: A visitor closes the dialog with Escape

- **WHEN** a visitor opens an award photo and presses Escape
- **THEN** the dialog closes and the award is focused

#### Scenario: A visitor closes the dialog by clicking outside it

- **WHEN** a visitor opens an award photo and clicks outside the dialog
- **THEN** the dialog closes

#### Scenario: A keyboard user opens an award photo

- **WHEN** a keyboard user focuses an award and presses Enter
- **THEN** the dialog opens and focus is inside it

#### Scenario: The photo fits a phone

- **WHEN** the viewport is 375px wide and a visitor opens an award photo
- **THEN** the whole photo and its caption are visible without horizontal scroll

### Requirement: An award photo is a content entry

Each award in the education content SHALL carry its photo and the photo's alt text, so a photo is swapped by changing data. The photo SHALL ship with the site from the repo.

#### Scenario: An award photo is replaced

- **WHEN** the photo in an award's content entry changes
- **THEN** the dialog shows the new photo without a component change

## MODIFIED Requirements

### Requirement: The experience and education section shows the owner's history

The home page SHALL show a section reachable at `#experience` with the owner's jobs, newest first, each with its role, period and organisation. The jobs SHALL work as an accordion: exactly one job is expanded at a time and shows its highlights and stack tags. The newest job SHALL be expanded by default. Pointing at a job or activating it SHALL expand it. When a mouse pointer leaves the jobs, the newest job SHALL expand again. A keyboard user SHALL be able to expand any job. Next to the jobs it SHALL show one education card with the university logo and name, then each degree with its level, field and graduation year, and under each degree its thesis award with a medal, the place and the label.

#### Scenario: A visitor reads the experience

- **WHEN** a visitor reaches the experience section
- **THEN** they see every job with its role, period and organisation, newest first, and the newest job's highlights and tags

#### Scenario: A visitor expands a job

- **WHEN** a visitor activates a collapsed job
- **THEN** its highlights and tags show and the previously expanded job collapses

#### Scenario: A visitor points at a job

- **WHEN** a visitor points at a collapsed job and then moves the pointer away
- **THEN** that job collapses and the newest job is expanded again

#### Scenario: A keyboard user expands a job

- **WHEN** a keyboard user focuses a collapsed job and presses Enter
- **THEN** that job expands

#### Scenario: A visitor reads the education

- **WHEN** a visitor reaches the education section
- **THEN** they see the university logo and name, and each degree with its graduation year and its thesis award
