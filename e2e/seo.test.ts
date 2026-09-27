import {
  shortName,
  siteName,
  siteUrl,
  socialImageSize,
  themeColor,
} from './support/data'
import { expect, test } from './support/fixtures'

test('a social network can unfurl the link', async ({ homePage, crawler }) => {
  await test.step('Given the home page', async () => {
    await homePage.open()
  })

  await test.step('When a crawler reads the head', async () => {})

  await test.step('Then it finds the title, canonical, Open Graph and Twitter tags', async () => {
    expect(await homePage.getTitle()).toContain(siteName)
    expect(await crawler.getLinkHref('canonical')).toBe(siteUrl)
    expect(await crawler.getMeta('property="og:title"')).toContain(siteName)
    expect(await crawler.getMeta('property="og:description"')).toBeTruthy()
    expect(await crawler.getMeta('property="og:url"')).toBe(siteUrl)
    expect(await crawler.getMeta('property="og:site_name"')).toBe(siteName)
    expect(await crawler.getMeta('property="og:image:width"')).toBe(
      socialImageSize.width
    )
    expect(await crawler.getMeta('property="og:image:height"')).toBe(
      socialImageSize.height
    )
    expect(await crawler.getMeta('name="twitter:card"')).toBe(
      'summary_large_image'
    )
    expect(await crawler.getMeta('name="theme-color"')).toBe(themeColor)
  })
})

test('a crawler can fetch the social image', async ({ homePage, crawler }) => {
  let imageUrl = ''

  await test.step('Given the home page', async () => {
    await homePage.open()
  })

  await test.step('When a crawler follows the Open Graph image', async () => {
    imageUrl = (await crawler.getMeta('property="og:image"')) ?? ''
  })

  await test.step('Then it receives a PNG', async () => {
    const response = await crawler.fetch(new URL(imageUrl).pathname)

    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('image/png')
  })
})

test('a crawler finds robots, sitemap and manifest', async ({ crawler }) => {
  await test.step('Given the site', async () => {})

  await test.step('When a crawler requests the crawler files', async () => {})

  await test.step('Then robots allows all and names the sitemap, the sitemap lists the site, the manifest carries the name and short name', async () => {
    const robots = await (await crawler.fetch('/robots.txt')).text()
    const sitemap = await (await crawler.fetch('/sitemap.xml')).text()
    const manifest = await (await crawler.fetch('/manifest.webmanifest')).json()

    expect(robots).toMatch(/Allow: \//)
    expect(robots).toContain(`${siteUrl}/sitemap.xml`)
    expect(sitemap).toContain(siteUrl)
    expect(manifest.name).toBe(siteName)
    expect(manifest.short_name).toBe(shortName)
    expect(manifest.theme_color).toBe(themeColor)
  })
})

test('a browser finds the icons', async ({ homePage, crawler }) => {
  await test.step('Given the home page', async () => {
    await homePage.open()
  })

  await test.step('When a browser follows the icon links', async () => {})

  await test.step('Then both the SVG icon and the Apple touch icon answer', async () => {
    const icon = await crawler.getLinkHref('icon')
    const appleIcon = await crawler.getLinkHref('apple-touch-icon')

    expect(icon).toContain('.svg')
    expect((await crawler.fetch(icon ?? '')).status()).toBe(200)
    expect((await crawler.fetch(appleIcon ?? '')).status()).toBe(200)
  })
})

test('a search engine parses the Person structured data', async ({
  homePage,
  crawler,
}) => {
  await test.step('Given the home page', async () => {
    await homePage.open()
  })

  await test.step('When a search engine reads the structured data', async () => {})

  await test.step('Then it finds a Person with the owner name, job title, employer and profile', async () => {
    const person = await crawler.getStructuredData()

    expect(person['@type']).toBe('Person')
    expect(person.name).toBe(siteName)
    expect(person.jobTitle).toBeTruthy()
    expect(person.worksFor.name).toBeTruthy()
    expect(person.address.addressLocality).toBeTruthy()
    expect(person.sameAs[0]).toContain('linkedin.com')
  })
})
