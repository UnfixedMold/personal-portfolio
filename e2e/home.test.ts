import { phoneWidth, siteName } from './support/data'
import { expect, test } from './support/fixtures'

test('the site is up and answers', async ({ homePage }) => {
  let status = 0

  await test.step('Given a visitor with the site address', async () => {})

  await test.step('When they open the home page', async () => {
    const response = await homePage.open()

    status = response?.status() ?? 0
  })

  await test.step('Then the site answers successfully', async () => {
    expect(status).toBe(200)
  })
})

test('a visitor sees the themed home page', async ({ homePage }) => {
  await test.step('Given a visitor with the site address', async () => {})

  await test.step('When they open the home page', async () => {
    await homePage.open()
  })

  await test.step('Then they see the page titled with the owner name', async () => {
    const title = await homePage.getTitle()

    expect(title).toContain(siteName)
    await expect(homePage.main).toBeAttached()
  })
})

test('the page does not scroll sideways on a phone', async ({ homePage }) => {
  await test.step('Given a visitor on a phone', async () => {
    await homePage.resizeToWidth(phoneWidth)
  })

  await test.step('When they open the home page', async () => {
    await homePage.open()
  })

  await test.step('Then the page has no horizontal scroll', async () => {
    const overflow = await homePage.getHorizontalOverflow()

    expect(overflow).toBe(0)
  })
})
