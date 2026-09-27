import type { StaticImageData } from 'next/image'

export type Project = {
  title: string
  type: string
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
  title: 'Side projects',
  subtitle:
    'Two things I built alone, for myself, from first commit to a live server.',
  items: [
    {
      title: 'h2bc store',
      type: 'Web app',
      description:
        'My own small clothing brand’s store. No Shopify — a Medusa backend, a custom Next.js storefront, payments, admin, CI deploys, all self‑hosted.',
      shows: 'Shows: full product build, e‑commerce, infra.',
      url: 'https://dev.h2bcweb.com/',
      domain: 'dev.h2bcweb.com',
      imageLabel: 'storefront screenshot',
    },
    {
      title: 'AITRAF',
      type: 'AI app',
      description:
        'Master’s thesis turned into a working product: I labeled the dataset, trained ViT and temporal models, and shipped a FastAPI + Next.js demo anyone can try.',
      shows: 'Shows: data → model → deployed AI app.',
      url: 'https://aitraf-project.com/',
      domain: 'aitraf-project.com',
      imageLabel: 'demo app screenshot',
    },
  ],
}
