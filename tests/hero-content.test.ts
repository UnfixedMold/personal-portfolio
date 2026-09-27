import { describe, expect, it } from 'vitest'
import { hero } from '@/lib/content/hero'
import { threeWords } from './support/data'

describe('hero content', () => {
  it('rotates through the three words the keyframes are timed for', () => {
    const { words } = hero.headline

    const count = words.length

    expect(count).toBe(threeWords)
  })
})
