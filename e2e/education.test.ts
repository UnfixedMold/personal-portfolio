import { awardPlace, desktopWidth, phoneWidth } from './support/data'
import { expect, test } from './support/fixtures'

test('a visitor opens an award photo', async ({ homePage, education }) => {
  await test.step('Given a visitor at the education card', async () => {
    await homePage.resizeToWidth(desktopWidth)
    await homePage.open()
  })

  await test.step('When they activate an award', async () => {
    await education.openByClick(awardPlace)
  })

  await test.step('Then a dialog shows the award photo with its place and label', async () => {
    await expect(education.dialog).toBeVisible()
    await expect(education.photo).toBeVisible()
    await expect(education.caption).toContainText(awardPlace)
  })
})

test('a visitor closes the dialog with Escape', async ({
  homePage,
  education,
}) => {
  await test.step('Given a visitor looking at an award photo', async () => {
    await homePage.resizeToWidth(desktopWidth)
    await homePage.open()
    await education.openByClick(awardPlace)
    await expect(education.dialog).toBeVisible()
  })

  await test.step('When they press Escape', async () => {
    await education.closeWithEscape()
  })

  await test.step('Then the dialog closes and the award is focused', async () => {
    await expect(education.dialog).toBeHidden()
    await expect(education.award(awardPlace)).toBeFocused()
  })
})

test('a visitor closes the dialog by clicking outside it', async ({
  homePage,
  education,
}) => {
  await test.step('Given a visitor looking at an award photo', async () => {
    await homePage.resizeToWidth(desktopWidth)
    await homePage.open()
    await education.openByClick(awardPlace)
    await expect(education.dialog).toBeVisible()
  })

  await test.step('When they click outside the dialog', async () => {
    await education.closeByClickingOutside()
  })

  await test.step('Then the dialog closes', async () => {
    await expect(education.dialog).toBeHidden()
  })
})

test('a keyboard user opens an award photo', async ({
  homePage,
  education,
}) => {
  await test.step('Given a keyboard user at the education card', async () => {
    await homePage.resizeToWidth(desktopWidth)
    await homePage.open()
  })

  await test.step('When they focus an award and press Enter', async () => {
    await education.openByKeyboard(awardPlace)
  })

  await test.step('Then the dialog opens with focus inside it', async () => {
    await expect(education.dialog).toBeVisible()
    expect(await education.isFocusInsideDialog()).toBe(true)
  })
})

test('the photo fits a phone', async ({ homePage, education }) => {
  await test.step('Given a visitor on a phone', async () => {
    await homePage.resizeToWidth(phoneWidth)
    await homePage.open()
  })

  await test.step('When they open an award photo', async () => {
    await education.openByClick(awardPlace)
  })

  await test.step('Then the whole photo and its caption are visible without sideways scroll', async () => {
    await expect(education.photo).toBeVisible()
    await expect(education.caption).toBeVisible()
    expect(await education.getRightEdge()).toBeLessThanOrEqual(phoneWidth)
    expect(await homePage.getHorizontalOverflow()).toBe(0)
  })
})
