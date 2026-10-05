import { expect, test } from './support/fixtures'

test('the header call to action leads to the contact section', async ({
  homePage,
  header,
  contactPage,
}) => {
  await test.step('Given a visitor on the home page', async () => {
    await homePage.open()
  })

  await test.step('When they activate the call to action in the header', async () => {
    await header.callToAction.click()
  })

  await test.step('Then the contact section with the email, phone and LinkedIn links is in view', async () => {
    await expect(contactPage.section).toBeInViewport()
    await expect(contactPage.emailLink).toBeVisible()
    await expect(contactPage.phoneLink).toBeVisible()
    await expect(contactPage.linkedInLink).toBeVisible()
  })
})

test('a visitor returns to the contact section from the header', async ({
  homePage,
  header,
  contactPage,
}) => {
  await test.step('Given a visitor who went to the contact section and scrolled back to the top', async () => {
    await homePage.open()
    await header.callToAction.click()
    await expect(contactPage.section).toBeInViewport()
    await header.scrollToTop()
    await expect(contactPage.section).not.toBeInViewport()
  })

  await test.step('When they activate the call to action in the header again', async () => {
    await header.callToAction.click()
  })

  await test.step('Then the contact section is in view again', async () => {
    await expect(contactPage.section).toBeInViewport()
  })
})
