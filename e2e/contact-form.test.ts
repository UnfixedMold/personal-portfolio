import { fieldCount, invalidEmail, validContact } from './support/data'
import { expect, test } from './support/fixtures'

test('an empty form points out every missing field', async ({
  homePage,
  contactPage,
}) => {
  await test.step('Given a visitor at the contact form', async () => {
    await homePage.open()
  })

  await test.step('When they send it without filling anything in', async () => {
    await contactPage.send()
  })

  await test.step('Then they see an error under each field and no success message', async () => {
    await expect(contactPage.errors).toHaveCount(fieldCount)
    await expect(contactPage.successMessage).toHaveCount(0)
  })
})

test('a mistyped email is flagged and the rest is kept', async ({
  homePage,
  contactPage,
}) => {
  await test.step('Given a visitor who filled the form with a bad email', async () => {
    await homePage.open()
    await contactPage.fill({ ...validContact, email: invalidEmail })
  })

  await test.step('When they send it', async () => {
    await contactPage.send()
  })

  await test.step('Then they see one error, under the email, and their name and message stay', async () => {
    await expect(contactPage.errors).toHaveCount(1)
    await expect(contactPage.emailField).toHaveAttribute('aria-invalid', 'true')
    await expect(contactPage.nameField).toHaveValue(validContact.name)
    await expect(contactPage.messageField).toHaveValue(validContact.message)
  })
})

test('a valid message is sent and the form clears', async ({
  homePage,
  contactPage,
}) => {
  await test.step('Given a visitor who filled the form in', async () => {
    await homePage.open()
    await contactPage.fill(validContact)
  })

  await test.step('When they send it', async () => {
    await contactPage.send()
  })

  await test.step('Then they see the success message and empty fields', async () => {
    await expect(contactPage.successMessage).toBeVisible()
    await expect(contactPage.errors).toHaveCount(0)
    await expect(contactPage.nameField).toHaveValue('')
    await expect(contactPage.emailField).toHaveValue('')
    await expect(contactPage.messageField).toHaveValue('')
  })
})
