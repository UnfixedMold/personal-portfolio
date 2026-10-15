import { fireEvent, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Education } from '@/components/education'
import { testEducation } from './support/content'
import { renderComponent } from './support/render'

describe('Education', () => {
  it('offers a button for every award, named by its place', () => {
    renderComponent(Education, { education: testEducation })

    const awards = testEducation.school.degrees.map((degree) => degree.award)
    const buttons = awards.map((award) =>
      screen.getByRole('button', { name: new RegExp(award.place) })
    )

    expect(buttons).toHaveLength(awards.length)
  })

  it('shows the award photo in a dialog when an award is activated', async () => {
    renderComponent(Education, { education: testEducation })
    const [{ award }] = testEducation.school.degrees

    fireEvent.click(
      screen.getByRole('button', { name: new RegExp(award.place) })
    )

    const dialog = await screen.findByRole('dialog')
    const photo = within(dialog).getByRole('img', { name: award.photoLabel })

    expect(photo).toHaveAttribute('src')
    expect(dialog).toHaveAccessibleName(new RegExp(award.place))
  })
})
