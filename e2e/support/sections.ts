import type { Locator, Page } from '@playwright/test'

export class Sections {
  constructor(private readonly page: Page) {}

  cardsIn(title: string) {
    return this.page
      .getByRole('region', { name: title })
      .locator('[data-slot=card]')
  }

  heading(title: string) {
    return this.page.getByRole('heading', { level: 2, name: title })
  }

  async getTop(locator: Locator) {
    const box = await locator.boundingBox()

    return box?.y ?? 0
  }

  async getLeftEdges(cards: Locator) {
    const boxes = await cards.evaluateAll((elements) =>
      elements.map((element) => element.getBoundingClientRect().left)
    )

    return boxes
  }
}
