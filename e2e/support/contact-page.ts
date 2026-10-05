import type { Page } from '@playwright/test'

type ContactValues = { name: string; email: string; message: string }

export class ContactPage {
  constructor(private readonly page: Page) {}

  get section() {
    return this.page.getByRole('region', { name: /have something to build/i })
  }

  get emailLink() {
    return this.section.getByRole('link', { name: /@/ })
  }

  get phoneLink() {
    return this.section.getByRole('link', { name: /\+370/ })
  }

  get linkedInLink() {
    return this.section.getByRole('link', { name: /linkedin/i })
  }

  get nameField() {
    return this.section.getByLabel(/name/i)
  }

  get emailField() {
    return this.section.getByLabel(/email/i)
  }

  get messageField() {
    return this.section.getByLabel(/message/i)
  }

  get sendButton() {
    return this.section.getByRole('button', { name: /^send message$/i })
  }

  get errors() {
    return this.section.getByRole('alert')
  }

  get successMessage() {
    return this.section.getByRole('status').filter({ hasText: /sent/i })
  }

  get sendAnotherButton() {
    return this.section.getByRole('button', { name: /send another/i })
  }

  get messageError() {
    return this.section
      .getByRole('group')
      .filter({ has: this.page.getByRole('textbox', { name: /message/i }) })
      .getByRole('alert')
  }

  async fill(values: Partial<ContactValues>) {
    if (values.name !== undefined) await this.nameField.fill(values.name)
    if (values.email !== undefined) await this.emailField.fill(values.email)

    if (values.message !== undefined) {
      await this.messageField.fill(values.message)
    }
  }

  async send() {
    await this.sendButton.click()
  }

  async sendAnother() {
    await this.sendAnotherButton.click()
  }
}
