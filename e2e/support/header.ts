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
    return this.banner.getByRole('navigation', { name: 'Sections' })
  }

  get menuButton() {
    return this.banner.getByRole('button', { name: 'Menu' })
  }

  get menu() {
    return this.banner.getByRole('navigation', { name: 'Menu' })
  }

  get callToAction() {
    return this.banner.getByRole('link', { name: /get in touch/i })
  }

  navLink(label: string) {
    return this.nav.getByRole('link', { name: label })
  }

  menuLink(label: string) {
    return this.menu.getByRole('link', { name: label })
  }

  async openMenu() {
    await this.menuButton.click()
  }

  async scrollDown(pixels: number) {
    await this.page.mouse.wheel(0, pixels)
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0))
  }

  async getBottom() {
    const box = await this.banner.boundingBox()

    return (box?.y ?? 0) + (box?.height ?? 0)
  }
}
