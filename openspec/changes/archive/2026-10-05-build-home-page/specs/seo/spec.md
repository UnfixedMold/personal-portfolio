# Spec Delta

## Purpose

The metadata, social image, crawler files and structured data that let search engines and social networks describe the owner correctly from the one public page.

## ADDED Requirements

### Requirement: The page has social metadata

The home page SHALL carry Open Graph and Twitter card metadata: title, description, canonical URL, site name, locale, type and a social image with its dimensions and alt text. The values SHALL come from the same content as the page.

#### Scenario: A social network unfurls the link

- **WHEN** a link to `/` is shared
- **THEN** the response carries the Open Graph and Twitter tags with the title, the description, the canonical URL and the image

### Requirement: The social image is generated from the site content

The site SHALL serve a 1200 by 630 social image that shows the owner's name, the headline and the site's look, generated at build time from the content and the theme.

#### Scenario: A crawler fetches the social image

- **WHEN** a crawler requests the image the Open Graph tags point at
- **THEN** it receives a 1200 by 630 image carrying the owner's name and headline

### Requirement: Crawlers get robots and sitemap files

The site SHALL serve `robots.txt` allowing every crawler and pointing at the sitemap, and `sitemap.xml` listing the home page with its last modified date.

#### Scenario: A crawler reads robots.txt

- **WHEN** a crawler requests `/robots.txt`
- **THEN** it is allowed everywhere and told where the sitemap is

#### Scenario: A crawler reads the sitemap

- **WHEN** a crawler requests `/sitemap.xml`
- **THEN** it lists the canonical home page URL

### Requirement: The page carries Person structured data

The home page SHALL embed JSON-LD describing the owner as a Person: name, job title, employer, location, email, phone, profile links, alma mater and knowledge areas from the services. The content config SHALL be the only source, and the output SHALL be safe against script injection.

#### Scenario: A search engine parses the structured data

- **WHEN** a crawler reads `/`
- **THEN** it finds a valid Person object with the owner's name, job title, employer, location and profile links

### Requirement: The site has icons and a manifest

The site SHALL serve a favicon, an SVG icon, an Apple touch icon and a web manifest with the site name, colors and icons, all matching the theme.

#### Scenario: A visitor bookmarks the site

- **WHEN** a browser requests the icons or the manifest
- **THEN** it receives them and the tab, bookmark and home screen show the site's mark

### Requirement: Headings and landmarks are meaningful

The page SHALL have exactly one first-level heading in the hero, a second-level heading per section, landmarks for header, main, each section and footer, and a descriptive alt text or an empty alt for every image.

#### Scenario: An accessibility check runs on the page

- **WHEN** an automated accessibility check runs on `/`
- **THEN** it reports one first-level heading, a heading per section and no missing alt text
