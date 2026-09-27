import { z } from 'zod'
import { contact } from '@/lib/content/contact'

const { form } = contact

export const honeypotField = 'company'

const contactSchema = z.object({
  name: z.string().trim().min(1, form.name.required),
  email: z
    .string()
    .trim()
    .min(1, form.email.required)
    .pipe(z.email(form.email.invalid)),
  message: z.string().trim().min(1, form.message.required),
})

export type ContactValues = z.infer<typeof contactSchema>
export type ContactErrors = Partial<Record<keyof ContactValues, string>>

export type ContactState = {
  values: ContactValues
  errors: ContactErrors
  status: 'idle' | 'success'
}

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

export function parseContact(formData: FormData): ContactState {
  const isSpam = getField(formData, honeypotField) !== ''

  if (isSpam) {
    return { values: emptyValues, errors: {}, status: 'success' }
  }

  const values: ContactValues = {
    name: getField(formData, 'name'),
    email: getField(formData, 'email'),
    message: getField(formData, 'message'),
  }
  const result = contactSchema.safeParse(values)

  if (!result.success) {
    return { values, errors: getFirstErrors(result.error), status: 'idle' }
  }

  return { values: emptyValues, errors: {}, status: 'success' }
}
