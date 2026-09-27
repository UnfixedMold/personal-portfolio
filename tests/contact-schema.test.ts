import { describe, expect, it } from 'vitest'
import { honeypotField, parseContact } from '@/lib/contact-schema'
import { toFormData } from './support/form-data'

describe('parseContact', () => {
  it('treats a filled honeypot as sent without reading the message', () => {
    const formData = toFormData({ [honeypotField]: 'bot' })

    const state = parseContact(formData)

    expect(state.status).toBe('success')
    expect(state.errors).toEqual({})
  })
})
