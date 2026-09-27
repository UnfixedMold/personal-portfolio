import { expect, test } from './support/fixtures'

test('the page passes an automated accessibility check', async ({
  homePage,
  accessibility,
}) => {
  await test.step('Given the home page', async () => {
    await homePage.open()
  })

  await test.step('When an accessibility check runs', async () => {})

  await test.step('Then it finds no violations, one top heading, a heading per section and no image without alt text', async () => {
    const violations = await accessibility.analyze()

    expect(violations).toEqual([])
    await expect(accessibility.topHeadings).toHaveCount(1)
    expect(await accessibility.countSectionsWithoutHeading()).toBe(0)
    await expect(accessibility.imagesWithoutAlt).toHaveCount(0)
  })
})
