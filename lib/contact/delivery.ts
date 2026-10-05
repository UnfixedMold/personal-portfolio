import {
  emptyValues,
  parseContact,
  type ContactState,
  type ContactValues,
} from '@/lib/contact/schema'
import { sendContactMail } from '@/lib/contact/mailer'
import { isWithinLimit } from '@/lib/contact/rate-limit'

async function deliver(values: ContactValues): Promise<ContactState> {
  const { error } = await sendContactMail(values)

  if (error) {
    console.error('contact-form: send failed', error)

    return { values, errors: {}, status: 'error' }
  }

  return { values: emptyValues, errors: {}, status: 'success' }
}

export async function deliverContact(
  formData: FormData,
  ip: string
): Promise<ContactState> {
  const outcome = parseContact(formData)

  if (outcome.kind === 'spam') {
    return { values: emptyValues, errors: {}, status: 'success' }
  }

  if (outcome.kind === 'invalid') {
    return { values: outcome.values, errors: outcome.errors, status: 'idle' }
  }

  if (!(await isWithinLimit(ip))) {
    return { values: outcome.values, errors: {}, status: 'limited' }
  }

  return deliver(outcome.values)
}
