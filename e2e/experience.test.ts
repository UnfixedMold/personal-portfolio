import {
  clickedRole,
  desktopWidth,
  keyedRole,
  newestRole,
  phoneWidth,
  tappedRole,
} from './support/data'
import { expect, test } from './support/fixtures'

test('a visitor expands a job', async ({ homePage, experience }) => {
  await test.step('Given a visitor at the experience section', async () => {
    await homePage.resizeToWidth(desktopWidth)
    await homePage.open()
    await expect(experience.highlightsOf(newestRole)).toBeVisible()
  })

  await test.step('When they activate a collapsed job', async () => {
    await experience.expandByClick(clickedRole)
  })

  await test.step('Then its highlights show and the newest job collapses', async () => {
    await expect(experience.highlightsOf(clickedRole)).toBeVisible()
    await expect(experience.highlightsOf(newestRole)).toBeHidden()
  })
})

test('a keyboard user expands a job', async ({ homePage, experience }) => {
  await test.step('Given a keyboard user at the experience section', async () => {
    await homePage.resizeToWidth(desktopWidth)
    await homePage.open()
  })

  await test.step('When they focus a collapsed job and press Enter', async () => {
    await experience.expandByKeyboard(keyedRole)
  })

  await test.step('Then that job expands and the newest job collapses', async () => {
    await expect(experience.highlightsOf(keyedRole)).toBeVisible()
    await expect(experience.highlightsOf(newestRole)).toBeHidden()
  })
})

test.describe('on a touch phone', () => {
  test.use({ hasTouch: true })

  test('a phone visitor taps a job open', async ({ homePage, experience }) => {
    await test.step('Given a visitor on a phone', async () => {
      await homePage.resizeToWidth(phoneWidth)
      await homePage.open()
    })

    await test.step('When they tap a collapsed job', async () => {
      await experience.expandByTap(tappedRole)
    })

    await test.step('Then that job stays open and the newest job collapses', async () => {
      await expect(experience.highlightsOf(tappedRole)).toBeVisible()
      await expect(experience.highlightsOf(newestRole)).toBeHidden()
    })
  })
})
