import { ContactForm } from '@/components/contact/form'
import { LinkedInIcon } from '@/components/linkedin-icon'
import { Section } from '@/components/section'
import type { Contact as ContactContent } from '@/lib/content/contact'

type ContactProps = {
  contact: ContactContent
}

export function Contact({ contact }: ContactProps) {
  return (
    <Section id="contact" aria-labelledby="contact-title">
      <div className="from-secondary/80 to-card grid gap-[clamp(28px,5vw,64px)] rounded-[32px] border bg-linear-to-br p-[clamp(24px,4vw,48px)] md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h2
            id="contact-title"
            className="text-[clamp(28px,3.4vw,40px)] font-extrabold tracking-[-0.03em]"
          >
            {contact.title}
          </h2>
          <p className="text-muted-foreground">{contact.text}</p>
          <ul className="mt-2 flex flex-col gap-3">
            {contact.links.map((link) => (
              <li key={link.kind} className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="bg-card text-primary flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-extrabold shadow-xs"
                >
                  {link.kind === 'linkedin' ? <LinkedInIcon /> : link.glyph}
                </span>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  className="font-semibold hover:opacity-80"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm form={contact.form} email={contact.email} />
      </div>
    </Section>
  )
}
