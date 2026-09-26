import { cn } from 'cn'

export function Section({
  className,
  ...props
}: React.ComponentProps<'section'>) {
  return (
    <section
      className={cn(
        'mx-auto w-full max-w-[1200px] px-[clamp(20px,5vw,64px)] pb-[clamp(56px,7vw,96px)]',
        className
      )}
      {...props}
    />
  )
}
