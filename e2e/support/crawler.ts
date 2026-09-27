import type { Page } from '@playwright/test'

export class Crawler {
  constructor(private readonly page: Page) {}

  async getMeta(selector: string) {
    const content = await this.page
      .locator(`head meta[${selector}]`)
      .first()
      .getAttribute('content')

    return content
  }

  async getLinkHref(rel: string) {
    const href = await this.page
      .locator(`head link[rel="${rel}"]`)
      .first()
      .getAttribute('href')

    return href
  }

  async fetch(path: string) {
    const response = await this.page.request.get(path)

    return response
  }

  async getStructuredData() {
    const json = await this.page
      .locator('script[type="application/ld+json"]')
      .first()
      .textContent()

    return JSON.parse(json ?? 'null')
  }
}
