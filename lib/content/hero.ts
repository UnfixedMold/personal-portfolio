import { site } from '@/lib/site'

export type Hero = {
  eyebrow: string
  headline: {
    subject: string
    heart: string
    verb: string
    words: readonly string[]
    tail: string
  }
  pitch: string
}

export const hero: Hero = {
  eyebrow: `${site.name} · ${site.city}`,
  headline: {
    subject: 'I',
    heart: '♥',
    verb: 'to build',
    words: ['AI apps', 'ML models', 'web apps'],
    tail: 'end‑to‑end',
  },
  pitch: 'From training AI models to deploying web apps - I make things happen',
}
