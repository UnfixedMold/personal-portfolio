import { site } from '@/lib/site'

export type ContactLink = {
  kind: 'email' | 'phone' | 'linkedin'
  glyph?: string
  label: string
  href: string
  external: boolean
}

export type Contact = {
  title: string
  text: string
  links: readonly ContactLink[]
  form: {
    name: { label: string; placeholder: string; required: string }
    email: {
      label: string
      placeholder: string
      required: string
      invalid: string
    }
    message: { label: string; placeholder: string; required: string }
    submit: string
    pending: string
    success: string
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
  title: 'Have something to build?',
  text: 'Tell me what it is and I’ll get back to you.',
  links: contactLinks,
  form: {
    name: {
      label: 'Name',
      placeholder: 'Name',
      required: 'Tell me your name.',
    },
    email: {
      label: 'Email',
      placeholder: 'Email',
      required: 'Tell me where to reply.',
      invalid: 'That email address does not look right.',
    },
    message: {
      label: 'Message',
      placeholder: 'What are you building?',
      required: 'Tell me what you are building.',
    },
    submit: 'Send message',
    pending: 'Sending…',
    success: 'Sent ✓ I’ll get back to you soon.',
  },
}
