'use server'

import { parseContact, type ContactState } from '@/lib/contact-schema'

export async function sendMessage(
  previousState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const state = parseContact(formData)

  // TODO: deliver the message once the delivery change lands.
  return state
}
