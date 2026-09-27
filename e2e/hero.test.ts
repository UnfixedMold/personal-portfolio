import { headlineWords, wordCycleTimeout } from './support/data'
import { expect, test } from './support/fixtures'

test.describe('with motion', () => {
  test.use({ reducedMotion: 'no-preference' })

  test('the headline word rotates', async ({ homePage, hero }) => {
    await test.step('Given a visitor on the home page', async () => {
      await homePage.open()
    })

    await test.step('When they watch the hero for a moment', async () => {
      await expect(hero.word(headlineWords[0])).toBeVisible()
    })

    await test.step('Then the headline moves on to the next word', async () => {
      await expect(hero.word(headlineWords[1])).toBeVisible({
        timeout: wordCycleTimeout,
      })
    })
  })
})

test('the hero stays still for a visitor who prefers reduced motion', async ({
  homePage,
  hero,
}) => {
  await test.step('Given a visitor who prefers reduced motion', async () => {
    await homePage.preferReducedMotion()
  })

  await test.step('When they open the home page', async () => {
    await homePage.open()
  })

  await test.step('Then they see the first headline word and no other', async () => {
    await expect(hero.word(headlineWords[0])).toBeVisible()
    await expect(hero.word(headlineWords[1])).toBeHidden()
    await expect(hero.word(headlineWords[2])).toBeHidden()
  })
})
