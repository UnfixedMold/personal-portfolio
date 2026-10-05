import { Check } from 'lucide-react'
import { useEffect, useRef, type FormEvent } from 'react'
import { GradientTile } from '@/components/gradient-tile'
import { Button } from '@/components/ui/button'
import type { Contact } from '@/lib/content/contact'

type ContactSentProps = {
  success: Contact['form']['success']
  onReset: () => void
}

export function ContactSent({ success, onReset }: ContactSentProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => titleRef.current?.focus(), [])

  function resetForm(event: FormEvent) {
    event.preventDefault()
    onReset()
  }

  return (
    <div
      role="status"
      className="flex h-full flex-col items-start justify-center gap-4"
    >
      <GradientTile aria-hidden>
        <Check />
      </GradientTile>
      <h3
        ref={titleRef}
        tabIndex={-1}
        className="text-lg font-bold outline-none"
      >
        {success.title}
      </h3>
      <p className="text-muted-foreground">{success.text}</p>
      <form method="get" action="/#contact" onSubmit={resetForm}>
        <Button
          type="submit"
          variant="link"
          className="h-auto p-0 text-sm font-semibold"
        >
          {success.again}
        </Button>
      </form>
    </div>
  )
}
