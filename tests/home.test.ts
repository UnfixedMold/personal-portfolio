import { describe, expect, it } from 'vitest'
import { metadata } from '@/app/page'

describe('home page metadata', () => {
  it('points the canonical link at the page itself', () => {
    const { alternates } = metadata

    const canonical = alternates?.canonical

    expect(canonical).toBe('/')
  })
})
