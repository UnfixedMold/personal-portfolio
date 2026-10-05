import type { Metadata } from 'next'
import { Contact } from '@/components/contact/contact'
import { Education } from '@/components/education'
import { Experience } from '@/components/experience'
import { Hero } from '@/components/hero'
import { Method } from '@/components/method'
import { Projects } from '@/components/projects'
import { Section } from '@/components/section'
import { Services } from '@/components/services'
import { contact } from '@/lib/content/contact'
import { education } from '@/lib/content/education'
import { experience } from '@/lib/content/experience'
import { hero } from '@/lib/content/hero'
import { method } from '@/lib/content/method'
import { projects } from '@/lib/content/projects'
import { services } from '@/lib/content/services'
import { getPersonJsonLd, serializeJsonLd } from '@/lib/json-ld'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: { absolute: site.name },
  description: site.description,
  alternates: { canonical: '/' },
}

export default function HomePage() {
  const person = getPersonJsonLd({ site, experience, education, services })

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(person) }}
      />
      <Hero hero={hero} />
      <Services services={services} />
      <Method method={method} />
      <Section
        id="experience"
        className="grid gap-[clamp(24px,4vw,48px)] md:grid-cols-2"
        aria-label={`${experience.title} and ${education.title}`}
      >
        <Experience experience={experience} />
        <Education education={education} />
      </Section>
      <Projects projects={projects} />
      <Contact contact={contact} />
    </main>
  )
}
