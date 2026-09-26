import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SurfaceCard } from '@/components/surface-card'
import { cardBody } from './support/data'
import { renderComponent } from './support/render'

describe('SurfaceCard', () => {
  it('shows its content', () => {
    renderComponent(SurfaceCard, { children: cardBody })

    const content = screen.getByText(cardBody)

    expect(content).toBeVisible()
  })
})
