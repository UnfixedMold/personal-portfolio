import type { Page } from '@playwright/test'

export class Hero {
  constructor(private readonly page: Page) {}

  get headline() {
    return this.page.getByRole('heading', { level: 1 })
  }

  word(text: string) {
    return this.headline.getByText(text, { exact: true })
  }
}
