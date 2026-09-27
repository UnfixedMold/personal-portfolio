import { describe, expect, it } from 'vitest'
import { getPersonJsonLd, serializeJsonLd } from '@/lib/json-ld'
import {
  testEducation,
  testExperience,
  testServices,
  testSite,
} from './support/content'

describe('Person JSON-LD', () => {
  it('escapes angle brackets so the script cannot be closed early', () => {
    const person = getPersonJsonLd({
      site: { ...testSite, name: '</script><b>' },
      experience: testExperience,
      education: testEducation,
      services: testServices,
    })

    const json = serializeJsonLd(person)

    expect(json).not.toContain('<')
    expect(JSON.parse(json).name).toBe('</script><b>')
  })
})
