import { RateLimiterMemory } from 'rate-limiter-flexible'

const siteKey = 'site'

function getLimit(key: string, fallback: number) {
  return Number(process.env[key]) || fallback
}

const perIp = new RateLimiterMemory({
  points: getLimit('CONTACT_LIMIT_PER_IP', 5),
  duration: 600,
})

const perDay = new RateLimiterMemory({
  points: getLimit('CONTACT_LIMIT_PER_DAY', 100),
  duration: 86_400,
})

export async function isWithinLimit(ip: string) {
  try {
    await perIp.consume(ip)
    await perDay.consume(siteKey)

    return true
  } catch {
    return false
  }
}
