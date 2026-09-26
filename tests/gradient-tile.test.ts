import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { GradientTile } from '@/components/gradient-tile'
import { tileGlyph } from './support/data'
import { renderComponent } from './support/render'

describe('GradientTile', () => {
  it('shows its glyph', () => {
    renderComponent(GradientTile, { children: tileGlyph })

    const glyph = screen.getByText(tileGlyph)

    expect(glyph).toBeVisible()
  })
})
