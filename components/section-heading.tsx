import { cn } from 'cn'

type SectionHeadingProps = {
  id?: string
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeading({
  id,
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-9 flex flex-col items-center gap-2.5 text-center',
        className
      )}
    >
      <h2
        id={id}
        className="text-[clamp(28px,3.4vw,40px)] font-extrabold tracking-[-0.03em]"
      >
        {title}
      </h2>
      {subtitle ? <p className="text-muted-foreground">{subtitle}</p> : null}
    </div>
  )
}
