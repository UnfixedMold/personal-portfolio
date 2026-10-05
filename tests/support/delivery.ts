import { vi } from 'vitest'

const brokenMailServer = {
  SMTP_HOST: '127.0.0.1',
  SMTP_PORT: '1',
  SMTP_USER: 'form@example.test',
  CONTACT_TO: 'owner@example.test',
}

export async function loadDeliveryWithBrokenMailServer(
  limits: Record<string, string> = {}
) {
  Object.entries({ ...brokenMailServer, ...limits }).forEach(([key, value]) =>
    vi.stubEnv(key, value)
  )
  vi.spyOn(console, 'error').mockImplementation(() => undefined)
  vi.resetModules()

  const { deliverContact } = await import('@/lib/contact/delivery')

  return deliverContact
}

export function sendTimes(
  deliverContact: (formData: FormData, ip: string) => Promise<unknown>,
  formData: FormData,
  ips: string[]
) {
  return ips.reduce<Promise<unknown>>(
    (previous, ip) => previous.then(() => deliverContact(formData, ip)),
    Promise.resolve()
  )
}
