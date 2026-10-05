import {
  desktopWidth,
  experienceTitle,
  menuLabels,
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

  await test.step('Then they see the mark, call to action and a closed menu button but not the nav', async () => {
    await expect(header.homeLink).toBeVisible()
    await expect(header.callToAction).toBeVisible()
    await expect(header.menuButton).toHaveAttribute('aria-expanded', 'false')
    await expect(header.nav).toBeHidden()
    await expect(header.menu).toBeHidden()
  })
})

test('a visitor opens the menu on a phone', async ({ homePage, header }) => {
  await test.step('Given a visitor on a phone', async () => {
    await homePage.resizeToWidth(phoneWidth)
    await homePage.open()
  })

  await test.step('When they open the menu', async () => {
    await header.openMenu()
  })

  await test.step('Then they see the section links and the menu reads as expanded', async () => {
    await Promise.all(
      menuLabels.map((label) => expect(header.menuLink(label)).toBeVisible())
    )
    await expect(header.menuButton).toHaveAttribute('aria-expanded', 'true')
  })
})

test('a visitor navigates from the menu', async ({
  homePage,
  header,
  sections,
}) => {
  await test.step('Given a visitor on a phone with the menu open', async () => {
    await homePage.resizeToWidth(phoneWidth)
    await homePage.open()
    await header.openMenu()
  })

  await test.step('When they choose Experience', async () => {
    await header.menuLink('Experience').click()
  })

  await test.step('Then the menu closes and the experience heading sits in view below the header', async () => {
    const heading = sections.heading(experienceTitle)

    await expect(header.menu).toBeHidden()
    await expect(heading).toBeInViewport()
    expect(await sections.getTop(heading)).toBeGreaterThanOrEqual(
      await header.getBottom()
    )
  })
})

test('a visitor closes the menu with the button', async ({
  homePage,
  header,
}) => {
  await test.step('Given a visitor on a phone with the menu open', async () => {
    await homePage.resizeToWidth(phoneWidth)
    await homePage.open()
    await header.openMenu()
  })

  await test.step('When they press the menu button again', async () => {
    await header.menuButton.click()
  })

  await test.step('Then the menu closes and reads as collapsed', async () => {
    await expect(header.menu).toBeHidden()
    await expect(header.menuButton).toHaveAttribute('aria-expanded', 'false')
  })
})

test('a desktop visitor sees no menu button', async ({ homePage, header }) => {
  await test.step('Given a visitor on a desktop', async () => {
    await homePage.resizeToWidth(desktopWidth)
  })

  await test.step('When they open the home page', async () => {
    await homePage.open()
  })

  await test.step('Then the inline nav shows and the menu button does not', async () => {
    await expect(header.nav).toBeVisible()
    await expect(header.menuButton).toBeHidden()
  })
})

test('a visitor returns to the top from the header', async ({
  homePage,
  header,
  hero,
  contactPage,
}) => {
  await test.step('Given a visitor who went to the contact section', async () => {
    await homePage.open()
    await header.callToAction.click()
    await expect(contactPage.section).toBeInViewport()
  })

  await test.step('When they activate the brand mark in the header', async () => {
    await header.homeLink.click()
  })

  await test.step('Then the page is back at the top', async () => {
    await expect(hero.headline).toBeInViewport()
  })
})

test('a visitor goes to contact with the menu open', async ({
  homePage,
  header,
  contactPage,
}) => {
  await test.step('Given a visitor on a phone with the menu open', async () => {
    await homePage.resizeToWidth(phoneWidth)
    await homePage.open()
    await header.openMenu()
    await expect(header.menu).toBeVisible()
  })

  await test.step('When they activate the call to action', async () => {
    await header.callToAction.click()
  })

  await test.step('Then the menu closes and the contact section is in view', async () => {
    await expect(header.menu).toBeHidden()
    await expect(header.menuButton).toHaveAttribute('aria-expanded', 'false')
    await expect(contactPage.section).toBeInViewport()
  })
})
