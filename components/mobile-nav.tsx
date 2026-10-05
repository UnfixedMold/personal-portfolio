'use client'

import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import type { Site } from '@/lib/site'

type MobileNavProps = {
  nav: Site['nav']
}

const bar =
  'block h-0.5 w-5.5 rounded-full bg-foreground transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none'

export function MobileNav({ nav }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('click', closeOnOutsideClick)

    return () => document.removeEventListener('click', closeOnOutsideClick)
  }, [open])

  return (
    <Collapsible
      ref={root}
      open={open}
      onOpenChange={setOpen}
      className="lg:hidden"
    >
      <CollapsibleTrigger
        aria-label="Menu"
        className="group flex size-11 flex-none flex-col items-center justify-center gap-1.25"
      >
        <span
          className={`${bar} group-data-[state=open]:translate-y-1.75 group-data-[state=open]:rotate-45`}
        />
        <span className={`${bar} group-data-[state=open]:opacity-0`} />
        <span
          className={`${bar} group-data-[state=open]:-translate-y-1.75 group-data-[state=open]:-rotate-45`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="bg-background data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up absolute inset-x-0 top-full overflow-hidden border-b shadow-[0_24px_40px_rgba(60,30,140,.12)] duration-400 motion-reduce:animate-none">
        <nav
          aria-label="Menu"
          className="content-width animate-in fade-in-0 flex flex-col pt-2 pb-5 duration-300"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex min-h-14 items-center justify-between border-b text-xl font-bold last:border-b-0"
            >
              {item.label}
              <ArrowRight aria-hidden className="text-primary size-5" />
            </a>
          ))}
        </nav>
      </CollapsibleContent>
    </Collapsible>
  )
}
