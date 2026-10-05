import { BrandMark } from '@/components/brand-mark'
import { Button } from '@/components/ui/button'
import type { Site } from '@/lib/site'

type SiteHeaderProps = {
  site: Site
}

export function SiteHeader({ site }: SiteHeaderProps) {
  return (
    <header className="bg-background/70 sticky top-0 z-10 border-b backdrop-blur-xl">
      <div className="content-width flex h-19 items-center justify-between gap-4">
        <a href="#top" className="flex min-w-0 items-center gap-3.5">
          <BrandMark letter={site.mark} aria-hidden />
          <span className="text-[15px] leading-tight font-bold">
            <span className="sm:hidden">{site.shortName}</span>
            <span className="hidden sm:inline">{site.name}</span>
          </span>
        </a>
        <div className="flex items-center gap-8">
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
        </div>
      </div>
    </header>
  )
}
