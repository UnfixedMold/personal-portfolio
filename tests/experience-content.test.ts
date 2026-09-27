import { describe, expect, it } from 'vitest'
import { experience } from '@/lib/content/experience'
import { getStartYear } from './support/periods'

describe('experience content', () => {
  it('lists the jobs newest first', () => {
    const { jobs } = experience

    const startYears = jobs.map((job) => getStartYear(job.period))
    const newestFirst = [...startYears].sort((a, b) => b - a)

    expect(startYears).toEqual(newestFirst)
  })
})
