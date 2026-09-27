import type { Page } from '@playwright/test'

export class HomePage {
  constructor(private readonly page: Page) {}

  async open() {
    const response = await this.page.goto('/')

    return response
  }

  async getTitle() {
    const title = await this.page.title()

    return title
  }

  async getHorizontalOverflow() {
    const overflow = await this.page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth
    )

    return overflow
  }

  async preferReducedMotion() {
    await this.page.emulateMedia({ reducedMotion: 'reduce' })
  }

  async resizeToWidth(width: number) {
    await this.page.setViewportSize({ width, height: 800 })
  }
}
