'use client'

import Image from 'next/image'
import type { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { Award } from '@/lib/content/education'

type AwardDialogProps = {
  award: Award
  children: ReactNode
}

export function AwardDialog({ award, children }: AwardDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className="bg-muted/60 hover:bg-muted focus-visible:bg-muted focus-visible:ring-ring/50 grid w-full cursor-pointer grid-cols-[auto_1fr] gap-x-4 gap-y-3 rounded-2xl p-4 text-left transition-colors outline-none focus-visible:ring-3 @md:grid-cols-[auto_1fr_auto]">
        {children}
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="sm:max-w-lg">
        <DialogHeader className="pr-8">
          <DialogTitle className="text-base leading-snug">
            <span className="font-bold">{award.place}</span>
            <span className="text-muted-foreground font-normal">
              {' '}
              · {award.label}
            </span>
          </DialogTitle>
        </DialogHeader>
        <Image
          src={award.photo}
          alt={award.photoLabel}
          sizes="(min-width: 640px) 464px, calc(100vw - 5rem)"
          className="max-h-[70svh] w-full rounded-lg object-contain"
        />
      </DialogContent>
    </Dialog>
  )
}
