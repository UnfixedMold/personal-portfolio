import { describe, expect, it } from 'vitest'
import {
  dailyCapOfTwo,
  fiveVisits,
  invalidEmail,
  nextVisitorIp,
  otherVisitorIps,
  spamFields,
  validContact,
  visitorIp,
} from './support/data'
import { loadDeliveryWithBrokenMailServer, sendTimes } from './support/delivery'
import { toFormData } from './support/form-data'

describe('deliverContact', () => {
  it('shows an error and keeps the message when the mail server is down', async () => {
    const deliverContact = await loadDeliveryWithBrokenMailServer()

    const state = await deliverContact(toFormData(validContact), visitorIp)

    expect(state.status).toBe('error')
    expect(state.values).toEqual(validContact)
  })

  it('shows success to a bot without sending anything', async () => {
    const deliverContact = await loadDeliveryWithBrokenMailServer()

    const state = await deliverContact(toFormData(spamFields), visitorIp)

    expect(state.status).toBe('success')
  })

  it('asks a visitor to wait after five messages in ten minutes', async () => {
    const deliverContact = await loadDeliveryWithBrokenMailServer()

    await sendTimes(deliverContact, toFormData(validContact), fiveVisits)

    const state = await deliverContact(toFormData(validContact), visitorIp)

    expect(state.status).toBe('limited')
    expect(state.values).toEqual(validContact)
  })

  it('asks every visitor to wait once the daily cap is reached', async () => {
    const deliverContact = await loadDeliveryWithBrokenMailServer(dailyCapOfTwo)

    await sendTimes(deliverContact, toFormData(validContact), otherVisitorIps)

    const state = await deliverContact(toFormData(validContact), nextVisitorIp)

    expect(state.status).toBe('limited')
  })

  it('does not count invalid or spam submissions toward the limit', async () => {
    const deliverContact = await loadDeliveryWithBrokenMailServer()

    await sendTimes(
      deliverContact,
      toFormData({ ...validContact, email: invalidEmail }),
      fiveVisits
    )
    await sendTimes(deliverContact, toFormData(spamFields), fiveVisits)

    const state = await deliverContact(toFormData(validContact), visitorIp)

    expect(state.status).toBe('error')
  })
})
