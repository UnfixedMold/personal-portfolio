import { BrandMark } from '@/components/brand-mark'
import { MobileNav } from '@/components/mobile-nav'
import { Button } from '@/components/ui/button'
import type { Site } from '@/lib/site'

type SiteHeaderProps = {
  site: Site
}

export function SiteHeader({ site }: SiteHeaderProps) {
  return (
    <header className="before:bg-background/70 sticky top-0 z-10 border-b before:absolute before:inset-0 before:-z-10 before:backdrop-blur-xl">
      <div className="content-width flex h-19 items-center justify-between gap-4">
        <a href="#top" aria-label={site.name} className="flex items-center">
          <BrandMark letter={site.mark} aria-hidden />
        </a>
        <div className="flex items-center gap-[clamp(10px,3vw,32px)]">
          <nav
            aria-label="Sections"
            className="hidden gap-8 text-sm font-semibold lg:flex"
          >
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button asChild>
            <a href="#contact">{site.callToAction}</a>
          </Button>
          <MobileNav nav={site.nav} />
        </div>
      </div>
    </header>
  )
}
