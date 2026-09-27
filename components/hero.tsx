import { Section } from '@/components/section'
import type { Hero as HeroContent } from '@/lib/content/hero'

type HeroProps = {
  hero: HeroContent
}

export function Hero({ hero }: HeroProps) {
  return (
    <Section className="flex flex-col items-start gap-5.5 pt-[clamp(56px,8vw,110px)]">
      <p className="text-muted-foreground animate-rise text-sm font-semibold motion-reduce:animate-none">
        {hero.eyebrow}
      </p>
      <h1 className="animate-rise text-[clamp(42px,6.5vw,84px)] leading-[1.02] font-extrabold tracking-[-0.04em] [animation-delay:80ms] motion-reduce:animate-none">
        {hero.headline.subject}{' '}
        <span className="text-heart">{hero.headline.heart}</span>{' '}
        {hero.headline.verb}
        <br />
        <span className="*:animate-word-cycle inline-grid h-[1.05em] overflow-hidden align-bottom *:nth-2:[animation-delay:2.6s] *:nth-3:[animation-delay:5.2s] motion-reduce:*:animate-none motion-reduce:*:not-first:hidden">
          {hero.headline.words.map((word) => (
            <span key={word} className="gradient-text col-start-1 row-start-1">
              {word}
            </span>
          ))}
        </span>
        <br />
        {hero.headline.tail}
      </h1>
      <p className="text-muted-foreground animate-rise max-w-[640px] text-lg text-pretty [animation-delay:160ms] motion-reduce:animate-none">
        {hero.pitch}
      </p>
    </Section>
  )
}
