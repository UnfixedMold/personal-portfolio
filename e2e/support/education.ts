import type { Page } from '@playwright/test'

export class Education {
  constructor(private readonly page: Page) {}

  get section() {
    return this.page.locator('#experience')
  }

  award(place: string) {
    return this.section.getByRole('button', { name: new RegExp(place) })
  }

  get dialog() {
    return this.page.getByRole('dialog')
  }

  get photo() {
    return this.dialog.getByRole('img')
  }

  get caption() {
    return this.dialog.getByRole('heading')
  }

  async openByClick(place: string) {
    await this.award(place).click()
  }

  async openByKeyboard(place: string) {
    await this.award(place).focus()
    await this.page.keyboard.press('Enter')
  }

  async closeWithEscape() {
    await this.page.keyboard.press('Escape')
  }

  async closeByClickingOutside() {
    await this.page.mouse.click(1, 1)
  }

  async isFocusInsideDialog() {
    const inside = await this.dialog.evaluate((dialog) =>
      dialog.contains(document.activeElement)
    )

    return inside
  }

  async getRightEdge() {
    const box = await this.photo.boundingBox()

    return (box?.x ?? 0) + (box?.width ?? 0)
  }
}
