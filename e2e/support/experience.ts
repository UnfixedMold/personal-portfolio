import type { Page } from '@playwright/test'

export class Experience {
  constructor(private readonly page: Page) {}

  get section() {
    return this.page.locator('#experience')
  }

  job(role: string) {
    return this.section.getByRole('button', { name: new RegExp(role) })
  }

  highlightsOf(role: string) {
    return this.section.getByRole('region', { name: new RegExp(role) })
  }

  async expandByClick(role: string) {
    await this.job(role).click()
  }

  async expandByTap(role: string) {
    await this.job(role).tap()
  }

  async expandByKeyboard(role: string) {
    await this.job(role).focus()
    await this.page.keyboard.press('Enter')
  }
}
