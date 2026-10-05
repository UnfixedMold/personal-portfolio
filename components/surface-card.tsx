import { cn } from 'cn'
import { Card } from '@/components/ui/card'

const surfaces = {
  solid: 'bg-card',
  translucent: 'bg-card/80',
}

type SurfaceCardProps = React.ComponentProps<typeof Card> & {
  surface?: keyof typeof surfaces
}

export function SurfaceCard({
  className,
  surface = 'solid',
  ...props
}: SurfaceCardProps) {
  return (
    <Card
      className={cn(
        'rounded-3xl border shadow-none ring-0',
        surfaces[surface],
        className
      )}
      {...props}
    />
  )
}
