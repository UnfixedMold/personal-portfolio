import { z } from 'zod'
import { contact } from '@/lib/content/contact'

const { form } = contact

export const honeypotField = 'company'

export const maxLength = { name: 100, email: 254, message: 5000 }

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, form.name.required)
    .max(maxLength.name, form.name.tooLong),
  email: z
    .string()
    .trim()
    .min(1, form.email.required)
    .max(maxLength.email, form.email.tooLong)
    .pipe(z.email(form.email.invalid)),
  message: z
    .string()
    .trim()
    .min(1, form.message.required)
    .max(maxLength.message, form.message.tooLong),
})

export type ContactValues = z.infer<typeof contactSchema>
export type ContactErrors = Partial<Record<keyof ContactValues, string>>

export type ContactState = {
  values: ContactValues
  errors: ContactErrors
  status: 'idle' | 'success' | 'error' | 'limited'
}

export type ContactOutcome =
  | { kind: 'spam' }
  | { kind: 'invalid'; values: ContactValues; errors: ContactErrors }
  | { kind: 'valid'; values: ContactValues }

export const emptyValues: ContactValues = { name: '', email: '', message: '' }

export const initialContactState: ContactState = {
  values: emptyValues,
  errors: {},
  status: 'idle',
}

function getField(formData: FormData, name: string) {
  const value = formData.get(name)

  return typeof value === 'string' ? value : ''
}

function getFirstErrors(error: z.ZodError<ContactValues>): ContactErrors {
  const { fieldErrors } = z.flattenError(error)

  return Object.fromEntries(
    Object.entries(fieldErrors).map(([field, messages]) => [
      field,
      messages?.[0],
    ])
  )
}

export function parseContact(formData: FormData): ContactOutcome {
  const isSpam = getField(formData, honeypotField) !== ''

  if (isSpam) {
    return { kind: 'spam' }
  }

  const values: ContactValues = {
    name: getField(formData, 'name'),
    email: getField(formData, 'email'),
    message: getField(formData, 'message'),
  }
  const result = contactSchema.safeParse(values)

  if (!result.success) {
    return { kind: 'invalid', values, errors: getFirstErrors(result.error) }
  }

  return { kind: 'valid', values: result.data }
}
