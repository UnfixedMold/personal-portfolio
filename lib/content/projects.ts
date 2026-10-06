import type { StaticImageData } from 'next/image'
import aitrafScreenshot from '@/assets/images/aitraf.png'
import h2bcStoreScreenshot from '@/assets/images/h2bc-store.png'

export type Project = {
  title: string
  tags: readonly string[]
  description: string
  url: string
  domain: string
  image?: StaticImageData
  imageLabel: string
}

export type Projects = {
  title: string
  subtitle: string
  items: readonly Project[]
}

export const projects: Projects = {
  title: 'Personal projects',
  subtitle:
    'Hobby projects, built from scratch and self-hosted from my living room',
  items: [
    {
      title: 'h2bc store',
      tags: ['Web app'],
      description:
        'The online store for my own small clothing brand, built completely custom instead of on Shopify or any other e-commerce platform. It runs on Medusa.js, with a custom frontend, payments, admin panel and CI/CD pipelines.',
      url: 'https://dev.h2bcweb.com/',
      domain: 'dev.h2bcweb.com',
      image: h2bcStoreScreenshot,
      imageLabel: 'h2bc storefront screenshot',
    },
    {
      title: 'AITRAF project',
      tags: ['ML models', 'Web app'],
      description:
        'My master’s thesis, turned into a live demo styled like a retro ’90s website. Custom AI models trained on data I recorded and labeled myself. The models recognize aggressive inline tricks and rate how well they were done.',
      url: 'https://aitraf-project.com/',
      domain: 'aitraf-project.com',
      image: aitrafScreenshot,
      imageLabel: 'AITRAF project demo app screenshot',
    },
  ],
}
