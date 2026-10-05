import { createTransport } from 'nodemailer'
import { getContactMail } from '@/lib/contact/mail'
import type { ContactValues } from '@/lib/contact/schema'

const timeout = 10_000

function getEnv(key: string) {
  const value = process.env[key]

  if (!value) {
    throw new Error(`Missing env key ${key}`)
  }

  return value
}

function getAuth() {
  const pass = process.env.SMTP_PASSWORD

  return pass ? { user: getEnv('SMTP_USER'), pass } : undefined
}

function getTransport() {
  const port = Number(getEnv('SMTP_PORT'))

  return createTransport({
    host: getEnv('SMTP_HOST'),
    port,
    secure: port === 465,
    auth: getAuth(),
    connectionTimeout: timeout,
    greetingTimeout: timeout,
    socketTimeout: timeout,
  })
}

export async function sendContactMail(values: ContactValues) {
  try {
    const config = { from: getEnv('SMTP_USER'), to: getEnv('CONTACT_TO') }

    await getTransport().sendMail(getContactMail(values, config))

    return { error: null }
  } catch (error) {
    return { error }
  }
}
