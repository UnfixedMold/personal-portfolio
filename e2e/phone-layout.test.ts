import { phoneWidth, servicesTitle } from './support/data'
import { expect, test } from './support/fixtures'

test('the services stack in one column on a phone', async ({
  homePage,
  sections,
}) => {
  await test.step('Given a visitor on a phone', async () => {
    await homePage.resizeToWidth(phoneWidth)
  })

  await test.step('When they open the home page', async () => {
    await homePage.open()
  })

  await test.step('Then the service cards sit one under another with no sideways scroll', async () => {
    const cards = sections.cardsIn(servicesTitle)
    const leftEdges = await sections.getLeftEdges(cards)
    const overflow = await homePage.getHorizontalOverflow()

    expect(new Set(leftEdges).size).toBe(1)
    expect(overflow).toBe(0)
  })
})
