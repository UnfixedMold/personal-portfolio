import AxeBuilder from '@axe-core/playwright'
import type { Page } from '@playwright/test'

export class Accessibility {
  constructor(private readonly page: Page) {}

  async analyze() {
    const results = await new AxeBuilder({ page: this.page }).analyze()

    return results.violations
  }

  get topHeadings() {
    return this.page.getByRole('heading', { level: 1 })
  }

  get sections() {
    return this.page.getByRole('main').locator('section')
  }

  async countSectionsWithoutHeading() {
    const count = await this.sections.evaluateAll(
      (sections) =>
        sections.filter((section) => !section.querySelector('h1, h2')).length
    )

    return count
  }

  get imagesWithoutAlt() {
    return this.page.locator('img:not([alt])')
  }
}
