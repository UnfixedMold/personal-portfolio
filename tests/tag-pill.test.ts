import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TagPill } from '@/components/tag-pill'
import { pillLabel } from './support/data'
import { renderComponent } from './support/render'

describe('TagPill', () => {
  it('shows its label', () => {
    renderComponent(TagPill, { children: pillLabel })

    const label = screen.getByText(pillLabel)

    expect(label).toBeVisible()
  })
})
