import { site } from '@/lib/site'

export type ContactLink = {
  kind: 'email' | 'phone' | 'linkedin'
  glyph?: string
  label: string
  href: string
  external: boolean
}

type FieldCopy = {
  label: string
  placeholder: string
  required: string
  tooLong: string
}

export type Contact = {
  title: string
  text: string
  email: string
  links: readonly ContactLink[]
  form: {
    name: FieldCopy
    email: FieldCopy & { invalid: string }
    message: FieldCopy
    submit: string
    pending: string
    success: { title: string; text: string; again: string }
    error: string
    limited: string
  }
}

export const contactLinks: readonly ContactLink[] = [
  {
    kind: 'email',
    glyph: '@',
    label: site.email,
    href: `mailto:${site.email}`,
    external: false,
  },
  {
    kind: 'phone',
    glyph: '☏',
    label: site.phone.display,
    href: site.phone.href,
    external: false,
  },
  {
    kind: 'linkedin',
    label: 'LinkedIn',
    href: site.linkedIn,
    external: true,
  },
]

export const contact: Contact = {
  title: 'Got an idea?',
  text: "I'm tired to build projects alone, lets do something together",
  email: site.email,
  links: contactLinks,
  form: {
    name: {
      label: 'Name',
      placeholder: 'Name',
      required: 'Tell me your name.',
      tooLong: 'Keep your name under 100 characters.',
    },
    email: {
      label: 'Email',
      placeholder: 'Email',
      required: 'Tell me where to reply.',
      invalid: 'That email address does not look right.',
      tooLong: 'That email address is too long.',
    },
    message: {
      label: 'Message',
      placeholder: 'What are you building?',
      required: 'Tell me what you are building.',
      tooLong: 'Keep your message under 5000 characters.',
    },
    submit: 'Send message',
    pending: 'Sending…',
    success: {
      title: 'Message sent',
      text: 'Thanks for writing. I’ll get back to you soon.',
      again: 'Send another message',
    },
    error: 'Your message did not go through. Try again, or write to me at',
    limited: 'You have sent a few messages already. Try again a little later.',
  },
}
