import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Backdrop } from '@/components/backdrop'
import { site } from '@/lib/site'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="antialiased">
        <div className="relative isolate min-h-screen">
          <Backdrop />
          {children}
        </div>
      </body>
    </html>
  )
}
