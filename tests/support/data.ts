export const threeWords = 3

export const validContact = {
  name: 'Ada Lovelace',
  email: 'ada@example.test',
  message: 'I am building an analytical engine.',
}

export const invalidEmail = 'ada@'

export const tooLongMessage = 'a'.repeat(5001)

export const spamFields = { ...validContact, company: 'Bot Inc' }

export const testMailConfig = {
  from: 'form@example.test',
  to: 'owner@example.test',
}

export const visitorIp = '203.0.113.7'

export const fiveVisits = Array.from({ length: 5 }, () => visitorIp)

export const otherVisitorIps = ['203.0.113.8', '203.0.113.9']

export const nextVisitorIp = '203.0.113.10'

export const dailyCapOfTwo = { CONTACT_LIMIT_PER_DAY: '2' }
