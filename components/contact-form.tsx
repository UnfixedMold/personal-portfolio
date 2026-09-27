'use client'

import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { sendMessage } from '@/lib/contact-action'
import { honeypotField, initialContactState } from '@/lib/contact-schema'
import type { Contact } from '@/lib/content/contact'

type ContactFormProps = {
  form: Contact['form']
}

export function ContactForm({ form }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(
    sendMessage,
    initialContactState
  )
  const { values, errors, status } = state

  return (
    <form action={formAction} noValidate className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field data-invalid={Boolean(errors.name)}>
          <FieldLabel htmlFor="contact-name">{form.name.label}</FieldLabel>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder={form.name.placeholder}
            defaultValue={values.name}
            disabled={pending}
            aria-invalid={Boolean(errors.name)}
          />
          <FieldError>{errors.name}</FieldError>
        </Field>
        <Field data-invalid={Boolean(errors.email)}>
          <FieldLabel htmlFor="contact-email">{form.email.label}</FieldLabel>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={form.email.placeholder}
            defaultValue={values.email}
            disabled={pending}
            aria-invalid={Boolean(errors.email)}
          />
          <FieldError>{errors.email}</FieldError>
        </Field>
      </div>
      <Field data-invalid={Boolean(errors.message)}>
        <FieldLabel htmlFor="contact-message">{form.message.label}</FieldLabel>
        <Textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder={form.message.placeholder}
          defaultValue={values.message}
          disabled={pending}
          aria-invalid={Boolean(errors.message)}
          className="resize-none"
        />
        <FieldError>{errors.message}</FieldError>
      </Field>
      <input
        type="text"
        name={honeypotField}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />
      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="min-w-35 self-stretch sm:self-start"
      >
        {pending ? <Spinner /> : null}
        {pending ? form.pending : form.submit}
      </Button>
      <p
        role="status"
        aria-live="polite"
        className="text-primary text-sm font-semibold"
      >
        {status === 'success' ? form.success : null}
      </p>
    </form>
  )
}
