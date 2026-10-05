import { validContact } from './support/data'
import { expect, test } from './support/fixtures'

test.use({ javaScriptEnabled: false })

test('a valid message is sent without JavaScript', async ({
  homePage,
  contactPage,
}) => {
  await test.step('Given a visitor without JavaScript who filled the form in', async () => {
    await homePage.open()
    await contactPage.fill(validContact)
  })

  await test.step('When they send it', async () => {
    await contactPage.send()
  })

  await test.step('Then the page reloads with the success message', async () => {
    await expect(contactPage.successMessage).toBeVisible()
  })
})

test('another message can be sent without JavaScript', async ({
  homePage,
  contactPage,
}) => {
  await test.step('Given a visitor without JavaScript who just sent a message', async () => {
    await homePage.open()
    await contactPage.fill(validContact)
    await contactPage.send()
    await expect(contactPage.successMessage).toBeVisible()
  })

  await test.step('When they choose to send another', async () => {
    await contactPage.sendAnother()
  })

  await test.step('Then the page reloads with an empty form', async () => {
    await expect(contactPage.nameField).toHaveValue('')
    await expect(contactPage.messageField).toHaveValue('')
  })
})
