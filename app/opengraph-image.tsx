import { ImageResponse } from 'next/og'
import { accent, getBrandFont, gradient, heart, ink } from '@/lib/brand-image'
import { hero } from '@/lib/content/hero'
import { site } from '@/lib/site'

export const alt = `${site.name}: ${site.description}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const font = await getBrandFont()
  const [firstWord] = hero.headline.words

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        background: site.backgroundColor,
        color: ink,
        fontFamily: 'Plus Jakarta Sans',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div
          style={{
            display: 'flex',
            fontSize: 48,
            fontWeight: 800,
            letterSpacing: -3,
            color: ink,
          }}
        >
          <span style={{ color: accent }}>{'<'}</span>
          <span>{site.mark}</span>
          <span style={{ color: accent }}>{'/>'}</span>
        </div>
        <div style={{ fontSize: 30, fontWeight: 800, color: '#5d5876' }}>
          {hero.eyebrow}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 104,
          fontWeight: 800,
          letterSpacing: -5,
          lineHeight: 1,
        }}
      >
        <div style={{ display: 'flex', gap: 28 }}>
          <span>{hero.headline.subject}</span>
          <span style={{ color: heart }}>{hero.headline.heart}</span>
          <span>{hero.headline.verb}</span>
        </div>
        <div
          style={{
            backgroundImage: gradient,
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {firstWord}
        </div>
        <div>{hero.headline.tail}</div>
      </div>
      <div style={{ fontSize: 32, fontWeight: 800, color: '#5d5876' }}>
        {hero.pitch}
      </div>
    </div>,
    { ...size, fonts: [font] }
  )
}
