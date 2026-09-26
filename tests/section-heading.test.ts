import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SectionHeading } from '@/components/section-heading'
import { sectionSubtitle, sectionTitle } from './support/data'
import { renderComponent } from './support/render'

describe('SectionHeading', () => {
  it('shows the title and the subtitle', () => {
    renderComponent(SectionHeading, {
      title: sectionTitle,
      subtitle: sectionSubtitle,
    })

    const heading = screen.getByRole('heading', { name: sectionTitle })
    const subtitle = screen.getByText(sectionSubtitle)

    expect(heading).toBeVisible()
    expect(subtitle).toBeVisible()
  })
})
