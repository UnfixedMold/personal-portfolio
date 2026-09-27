import {
  desktopWidth,
  experienceTitle,
  phoneWidth,
  scrollDistance,
} from './support/data'
import { expect, test } from './support/fixtures'

test('the header stays in view while scrolling', async ({
  homePage,
  header,
}) => {
  await test.step('Given a visitor on a desktop', async () => {
    await homePage.resizeToWidth(desktopWidth)
    await homePage.open()
  })

  await test.step('When they scroll down the page', async () => {
    await header.scrollDown(scrollDistance)
  })

  await test.step('Then the header with its mark, nav and call to action is still visible', async () => {
    await expect(header.banner).toBeInViewport()
    await expect(header.homeLink).toBeVisible()
    await expect(header.nav).toBeVisible()
    await expect(header.callToAction).toBeVisible()
  })
})

test('the header nav leads to a section', async ({
  homePage,
  header,
  sections,
}) => {
  await test.step('Given a visitor on a desktop', async () => {
    await homePage.resizeToWidth(desktopWidth)
    await homePage.open()
  })

  await test.step('When they choose Experience in the header', async () => {
    await header.navLink('Experience').click()
  })

  await test.step('Then the experience heading sits in view below the header', async () => {
    const heading = sections.heading(experienceTitle)

    await expect(heading).toBeInViewport()
    expect(await sections.getTop(heading)).toBeGreaterThanOrEqual(
      await header.getBottom()
    )
  })
})

test('the header keeps only the essentials on a phone', async ({
  homePage,
  header,
}) => {
  await test.step('Given a visitor on a phone', async () => {
    await homePage.resizeToWidth(phoneWidth)
  })

  await test.step('When they open the home page', async () => {
    await homePage.open()
  })

  await test.step('Then they see the mark, first name and call to action but not the nav', async () => {
    await expect(header.homeLink).toBeVisible()
    await expect(header.callToAction).toBeVisible()
    await expect(header.nav).toBeHidden()
  })
})
