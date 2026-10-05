export const site = {
  name: 'Henrikas Antanas Girdzijauskas',
  shortName: 'Henrikas',
  mark: 'h',
  city: 'Vilnius',
  description:
    'Henrikas Antanas Girdzijauskas builds AI apps, ML models and web apps end to end, from the first document to production.',
  url: 'https://hgirdzijauskas.lt',
  email: 'hello@hgirdzijauskas.lt',
  phone: { display: '+370 69873251', href: 'tel:+37069873251' },
  linkedIn:
    'https://www.linkedin.com/in/henrikas-antanas-girdzijauskas-ab9b0413a/',
  callToAction: 'Book a call',
  nav: [
    { label: 'Services', href: '#services' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#work' },
  ],
  themeColor: '#fbfaff',
  backgroundColor: '#fbfaff',
}

export type Site = typeof site
