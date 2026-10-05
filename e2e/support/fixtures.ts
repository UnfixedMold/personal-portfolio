import { test as base } from '@playwright/test'
import { Accessibility } from './accessibility'
import { ContactPage } from './contact-page'
import { Crawler } from './crawler'
import { Experience } from './experience'
import { Header } from './header'
import { Hero } from './hero'
import { HomePage } from './home-page'
import { mailpitUrl } from './data'
import { Mailbox } from './mailbox'
import { Projects } from './projects'
import { Sections } from './sections'

type Fixtures = {
  homePage: HomePage
  header: Header
  hero: Hero
  sections: Sections
  experience: Experience
  projects: Projects
  contactPage: ContactPage
  mailbox: Mailbox
  crawler: Crawler
  accessibility: Accessibility
}

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
  header: async ({ page }, use) => {
    await use(new Header(page))
  },
  hero: async ({ page }, use) => {
    await use(new Hero(page))
  },
  sections: async ({ page }, use) => {
    await use(new Sections(page))
  },
  experience: async ({ page }, use) => {
    await use(new Experience(page))
  },
  projects: async ({ page }, use) => {
    await use(new Projects(page))
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page))
  },
  mailbox: async ({ playwright }, use) => {
    const api = await playwright.request.newContext({ baseURL: mailpitUrl })
    const mailbox = new Mailbox(api)

    await use(mailbox)
    await mailbox.close()
  },
  crawler: async ({ page }, use) => {
    await use(new Crawler(page))
  },
  accessibility: async ({ page }, use) => {
    await use(new Accessibility(page))
  },
})

export { expect } from '@playwright/test'
