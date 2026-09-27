type SiteFooterProps = {
  name: string
}

export function SiteFooter({ name }: SiteFooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="content-width text-muted-foreground py-8 text-center text-[13px]">
      © {year} {name}
    </footer>
  )
}
