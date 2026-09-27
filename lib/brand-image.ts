import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const gradient = 'linear-gradient(135deg, #5b2edb, #8b5cf6)'
export const ink = '#12101f'
export const accent = '#7c4dff'
export const heart = '#e5243b'

const fontPath = join(
  process.cwd(),
  'assets/fonts/plus-jakarta-sans-extrabold.ttf'
)

export async function getBrandFont() {
  const data = await readFile(fontPath)

  return {
    name: 'Plus Jakarta Sans',
    data: data.buffer.slice(
      data.byteOffset,
      data.byteOffset + data.byteLength
    ) as ArrayBuffer,
    weight: 800 as const,
    style: 'normal' as const,
  }
}
