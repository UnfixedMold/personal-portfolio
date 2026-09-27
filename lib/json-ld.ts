import type { Person, WithContext } from 'schema-dts'
import type { Education } from '@/lib/content/education'
import type { Experience } from '@/lib/content/experience'
import type { Services } from '@/lib/content/services'
import type { Site } from '@/lib/site'

type PersonSources = {
  site: Site
  experience: Experience
  education: Education
  services: Services
}

export function getPersonJsonLd({
  site,
  experience,
  education,
  services,
}: PersonSources): WithContext<Person> {
  const [currentJob] = experience.jobs

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone.display,
    jobTitle: currentJob.role,
    worksFor: { '@type': 'Organization', name: currentJob.organisation },
    address: { '@type': 'PostalAddress', addressLocality: site.city },
    sameAs: [site.linkedIn],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: education.school.name,
    },
    knowsAbout: services.items.map((service) => service.title),
  }
}

export function serializeJsonLd(data: WithContext<Person>) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
