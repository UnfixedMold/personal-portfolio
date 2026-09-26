import { cn } from 'cn'
import { Badge } from '@/components/ui/badge'

export function TagPill({
  className,
  ...props
}: React.ComponentProps<typeof Badge>) {
  return (
    <Badge
      variant="secondary"
      className={cn('h-auto px-2.5 py-1.5 text-xs font-semibold', className)}
      {...props}
    />
  )
}
