import type { SendMailOptions } from 'nodemailer'
import type { ContactValues } from '@/lib/contact/schema'

export type MailConfig = {
  from: string
  to: string
}

export function getContactMail(
  values: ContactValues,
  config: MailConfig
): SendMailOptions {
  const { name, email, message } = values

  return {
    from: { name: 'Portfolio', address: config.from },
    to: config.to,
    replyTo: { name, address: email },
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  }
}
