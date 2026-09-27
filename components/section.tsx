import { cn } from 'cn'

export function Section({
  className,
  ...props
}: React.ComponentProps<'section'>) {
  return (
    <section
      className={cn('content-width pb-[clamp(56px,7vw,96px)]', className)}
      {...props}
    />
  )
}
