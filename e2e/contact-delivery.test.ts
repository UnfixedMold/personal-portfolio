import {
  deliveryCheckDelay,
  getUniqueContact,
  invalidEmail,
} from './support/data'
import { expect, test } from './support/fixtures'

test('the owner receives a valid message', async ({
  homePage,
  contactPage,
  mailbox,
}) => {
  const visitor = getUniqueContact()

  await test.step('Given a visitor who filled the form in', async () => {
    await homePage.open()
    await contactPage.fill(visitor)
  })

  await test.step('When they send it', async () => {
    await contactPage.send()
    await expect(contactPage.successMessage).toBeVisible()
  })

  await test.step('Then one email with their name, email and message reaches the owner', async () => {
    await expect.poll(() => mailbox.messagesFrom(visitor.name)).toHaveLength(1)

    const [delivered] = await mailbox.messagesFrom(visitor.name)

    expect(delivered.text).toContain(visitor.name)
    expect(delivered.text).toContain(visitor.email)
    expect(delivered.text).toContain(visitor.message)
  })
})

test('the owner replies straight to the visitor', async ({
  homePage,
  contactPage,
  mailbox,
}) => {
  const visitor = getUniqueContact()

  await test.step('Given a message the visitor sent', async () => {
    await homePage.open()
    await contactPage.fill(visitor)
    await contactPage.send()
    await expect(contactPage.successMessage).toBeVisible()
  })

  await test.step('When the owner opens it', async () => {
    await expect.poll(() => mailbox.messagesFrom(visitor.name)).toHaveLength(1)
  })

  await test.step('Then a reply goes to the visitor email', async () => {
    const [delivered] = await mailbox.messagesFrom(visitor.name)

    expect(delivered.replyTo).toEqual([visitor.email])
  })
})

test('an invalid message never reaches the owner', async ({
  homePage,
  contactPage,
  mailbox,
  page,
}) => {
  const visitor = { ...getUniqueContact(), email: invalidEmail }

  await test.step('Given a visitor who mistyped their email', async () => {
    await homePage.open()
    await contactPage.fill(visitor)
  })

  await test.step('When they send it', async () => {
    await contactPage.send()
    await expect(contactPage.errors).toHaveCount(1)
  })

  await test.step('Then no email reaches the owner', async () => {
    await page.waitForTimeout(deliveryCheckDelay)

    expect(await mailbox.messagesFrom(visitor.name)).toHaveLength(0)
  })
})
