import { describe, expect, it } from 'vitest'
import { cn } from '@/lib/utils'
import { conflictingClasses } from './support/data'

describe('cn', () => {
  it('keeps the last of two conflicting classes', () => {
    const [, last] = conflictingClasses

    const result = cn(...conflictingClasses)

    expect(result).toBe(last)
  })
})
