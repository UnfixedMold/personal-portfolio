import type { StaticImageData } from 'next/image'
import aitrafScreenshot from '@/assets/images/aitraf.png'
import h2bcStoreScreenshot from '@/assets/images/h2bc-store.png'

export type Project = {
  title: string
  tags: readonly string[]
  description: string
  shows: string
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
  subtitle: "I'm tired to build projects alone, lets do something together.",
  items: [
    {
      title: 'h2bc store',
      tags: ['Web app'],
      description:
        'My own small clothing brand’s store. No Shopify — a Medusa backend, a custom Next.js storefront, payments, admin, CI deploys, all self‑hosted.',
      shows: 'Shows: full product build, e‑commerce, infra.',
      url: 'https://dev.h2bcweb.com/',
      domain: 'dev.h2bcweb.com',
      image: h2bcStoreScreenshot,
      imageLabel: 'h2bc storefront screenshot',
    },
    {
      title: 'AITRAF',
      tags: ['ML models', 'Web app'],
      description:
        'Master’s thesis turned into a working product: I labeled the dataset, trained ViT and temporal models, and shipped a FastAPI + Next.js demo anyone can try.',
      shows: 'Shows: data → model → deployed AI app.',
      url: 'https://aitraf-project.com/',
      domain: 'aitraf-project.com',
      image: aitrafScreenshot,
      imageLabel: 'AITRAF demo app screenshot',
    },
  ],
}
