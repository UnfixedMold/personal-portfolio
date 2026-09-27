import { cn } from 'cn'

export function LinkedInIcon({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn('size-5', className)}
      {...props}
    >
      <rect width="24" height="24" rx="3" className="fill-linkedin" />
      <path
        transform="translate(3.6 4.1) scale(0.7)"
        className="fill-white"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"
      />
    </svg>
  )
}
