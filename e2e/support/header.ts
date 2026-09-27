import type { Page } from '@playwright/test'
import { shortName } from './data'

export class Header {
  constructor(private readonly page: Page) {}

  get banner() {
    return this.page.getByRole('banner')
  }

  get homeLink() {
    return this.banner.getByRole('link', { name: shortName })
  }

  get nav() {
    return this.banner.getByRole('navigation')
  }

  get callToAction() {
    return this.banner.getByRole('link', { name: /book a call/i })
  }

  navLink(label: string) {
    return this.nav.getByRole('link', { name: label })
  }

  async scrollDown(pixels: number) {
    await this.page.mouse.wheel(0, pixels)
  }

  async getBottom() {
    const box = await this.banner.boundingBox()

    return (box?.y ?? 0) + (box?.height ?? 0)
  }
}
