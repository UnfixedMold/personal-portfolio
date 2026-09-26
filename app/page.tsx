import type { Metadata } from 'next'
import { Section } from '@/components/section'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: { absolute: site.name },
  description: site.description,
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <main>
      <Section />
    </main>
  )
}
