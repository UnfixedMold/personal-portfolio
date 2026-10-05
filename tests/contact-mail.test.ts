import { describe, expect, it } from 'vitest'
import { getContactMail } from '@/lib/contact/mail'
import { testMailConfig, validContact } from './support/data'

describe('getContactMail', () => {
  it('sends from the form mailbox to the owner', () => {
    const mail = getContactMail(validContact, testMailConfig)

    expect(mail.from).toMatchObject({ address: testMailConfig.from })
    expect(mail.to).toBe(testMailConfig.to)
  })

  it('lets the owner reply straight to the visitor', () => {
    const mail = getContactMail(validContact, testMailConfig)

    expect(mail.replyTo).toEqual({
      name: validContact.name,
      address: validContact.email,
    })
  })

  it('carries the visitor name, email and message in the body', () => {
    const mail = getContactMail(validContact, testMailConfig)

    expect(mail.text).toContain(validContact.name)
    expect(mail.text).toContain(validContact.email)
    expect(mail.text).toContain(validContact.message)
  })
})
