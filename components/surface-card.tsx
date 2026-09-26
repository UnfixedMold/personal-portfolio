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
        'hover:border-primary/35 hover:shadow-lift rounded-3xl border shadow-none ring-0 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1',
        surfaces[surface],
        className
      )}
      {...props}
    />
  )
}
