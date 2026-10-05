import { describe, expect, it } from 'vitest'
import { parseContact } from '@/lib/contact/schema'
import {
  invalidEmail,
  spamFields,
  tooLongMessage,
  validContact,
} from './support/data'
import { toFormData } from './support/form-data'

describe('parseContact', () => {
  it('treats a filled honeypot as spam without reading the message', () => {
    const formData = toFormData(spamFields)

    const outcome = parseContact(formData)

    expect(outcome).toEqual({ kind: 'spam' })
  })

  it('points out every missing field on an empty form', () => {
    const formData = toFormData({})

    const outcome = parseContact(formData)

    expect(outcome.kind).toBe('invalid')
    expect(outcome.kind === 'invalid' && Object.keys(outcome.errors)).toEqual([
      'name',
      'email',
      'message',
    ])
  })

  it('flags a mistyped email and keeps what the visitor typed', () => {
    const formData = toFormData({ ...validContact, email: invalidEmail })

    const outcome = parseContact(formData)

    expect(outcome).toMatchObject({
      kind: 'invalid',
      values: { ...validContact, email: invalidEmail },
    })
    expect(outcome.kind === 'invalid' && Object.keys(outcome.errors)).toEqual([
      'email',
    ])
  })

  it('flags a message that is too long and keeps the text', () => {
    const formData = toFormData({ ...validContact, message: tooLongMessage })

    const outcome = parseContact(formData)

    expect(outcome).toMatchObject({
      kind: 'invalid',
      values: { message: tooLongMessage },
    })
    expect(outcome.kind === 'invalid' && Object.keys(outcome.errors)).toEqual([
      'message',
    ])
  })

  it('accepts a filled-in form with its trimmed values', () => {
    const formData = toFormData({
      ...validContact,
      name: ` ${validContact.name} `,
    })

    const outcome = parseContact(formData)

    expect(outcome).toEqual({ kind: 'valid', values: validContact })
  })
})
