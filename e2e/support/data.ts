export const siteName = 'Henrikas Antanas Girdzijauskas'
export const shortName = 'Henrikas'
export const phoneWidth = 375
export const desktopWidth = 1280
export const scrollDistance = 1500
export const headlineWords = ['AI apps', 'ML models', 'web apps']
export const wordCycleTimeout = 6000
export const servicesTitle = 'What I build'
export const experienceTitle = 'Experience'
export const newestRole = 'AI Practice Lead'
export const clickedRole = 'ML/AI Engineer'
export const keyedRole = 'Machine Learning Engineer'
export const tappedRole = 'Software Engineer'
export const hoveredRole = 'Machine Learning Engineer'
export const projectTitle = 'h2bc store'
export const projectDomain = 'dev.h2bcweb.com'
export const validContact = {
  name: 'Ada Lovelace',
  email: 'ada@example.test',
  message: 'A difference engine.',
}
export const invalidEmail = 'ada-at-example'
export const fieldCount = 3
export const siteUrl = 'https://girdzijauskas.lt'
export const socialImageSize = { width: '1200', height: '630' }
export const themeColor = '#fbfaff'
export const mailpitUrl = process.env.MAILPIT_URL ?? 'http://mailpit:8025'
export const tooLongMessage = 'a'.repeat(5001)
export const deliveryCheckDelay = 1000

export function getUniqueContact() {
  return { ...validContact, name: `Ada ${crypto.randomUUID()}` }
}
