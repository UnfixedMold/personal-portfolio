'use server'

import { headers } from 'next/headers'
import { deliverContact } from '@/lib/contact/delivery'
import type { ContactState } from '@/lib/contact/schema'

const unknownIp = 'unknown'

async function getClientIp() {
  const forwardedFor = (await headers()).get('x-forwarded-for')

  return forwardedFor?.split(',')[0].trim() || unknownIp
}

export async function sendMessage(
  previousState: ContactState,
  formData: FormData
): Promise<ContactState> {
  return deliverContact(formData, await getClientIp())
}
