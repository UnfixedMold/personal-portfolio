import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Section } from '@/components/section'
import { sectionBody } from './support/data'
import { renderComponent } from './support/render'

describe('Section', () => {
  it('shows its content', () => {
    renderComponent(Section, { children: sectionBody })

    const content = screen.getByText(sectionBody)

    expect(content).toBeVisible()
  })
})
