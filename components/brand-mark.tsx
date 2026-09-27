import { cn } from 'cn'

type BrandMarkProps = React.ComponentProps<'span'> & {
  letter: string
}

export function BrandMark({ letter, className, ...props }: BrandMarkProps) {
  return (
    <span
      className={cn(
        'text-2xl leading-none font-extrabold tracking-[-0.06em]',
        className
      )}
      {...props}
    >
      <span className="text-ring">&lt;</span>
      {letter}
      <span className="text-ring">/&gt;</span>
    </span>
  )
}
