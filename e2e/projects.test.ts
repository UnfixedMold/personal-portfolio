import { projectDomain, projectTitle } from './support/data'
import { expect, test } from './support/fixtures'

test('a project card opens the live site in a new tab', async ({
  homePage,
  projects,
}) => {
  await test.step('Given a visitor on the home page', async () => {
    await projects.stubLiveSites()
    await homePage.open()
  })

  await test.step('When they activate a project card', async () => {
    const liveSite = await projects.open(projectTitle)

    expect(new URL(liveSite.url()).hostname).toBe(projectDomain)
  })

  await test.step('Then the home page is still open behind it', async () => {
    await expect(projects.card(projectTitle)).toBeVisible()
  })
})
