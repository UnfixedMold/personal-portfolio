import {
  fieldCount,
  invalidEmail,
  tooLongMessage,
  validContact,
} from './support/data'
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

test('a valid message replaces the form with a thank-you', async ({
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

  await test.step('Then they see the sent panel in place of the form', async () => {
    await expect(contactPage.successMessage).toBeVisible()
    await expect(contactPage.nameField).toHaveCount(0)
  })
})

test('a visitor can send another message', async ({
  homePage,
  contactPage,
}) => {
  await test.step('Given a visitor who just sent a message', async () => {
    await homePage.open()
    await contactPage.fill(validContact)
    await contactPage.send()
    await expect(contactPage.successMessage).toBeVisible()
  })

  await test.step('When they choose to send another', async () => {
    await contactPage.sendAnother()
  })

  await test.step('Then they see the form again with empty fields', async () => {
    await expect(contactPage.nameField).toHaveValue('')
    await expect(contactPage.emailField).toHaveValue('')
    await expect(contactPage.messageField).toHaveValue('')
  })
})

test('a message that is too long is flagged and the text is kept', async ({
  homePage,
  contactPage,
}) => {
  await test.step('Given a visitor who wrote more than the form takes', async () => {
    await homePage.open()
    await contactPage.fill({ ...validContact, message: tooLongMessage })
  })

  await test.step('When they send it', async () => {
    await contactPage.send()
  })

  await test.step('Then they see an error under the message and their text stays', async () => {
    await expect(contactPage.messageError).toBeVisible()
    await expect(contactPage.messageField).toHaveValue(tooLongMessage)
    await expect(contactPage.successMessage).toHaveCount(0)
  })
})
