import type { Page } from '@playwright/test'

export class Projects {
  constructor(private readonly page: Page) {}

  get region() {
    return this.page.getByRole('region', { name: /personal projects/i })
  }

  card(title: string) {
    return this.region.getByRole('link', { name: new RegExp(title, 'i') })
  }

  async stubLiveSites() {
    await this.page.context().route(
      (url) => url.hostname !== 'localhost',
      (route) =>
        route.fulfill({
          contentType: 'text/html',
          body: '<title>live site</title>',
        })
    )
  }

  async open(title: string) {
    const popup = this.page.context().waitForEvent('page')

    await this.card(title).click()

    const opened = await popup

    await opened.waitForLoadState()

    return opened
  }
}
