import { cn } from 'cn'

export function GradientTile({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'gradient-primary text-primary-foreground shadow-glow flex size-11 shrink-0 items-center justify-center rounded-[14px] font-extrabold',
        className
      )}
      {...props}
    />
  )
}
