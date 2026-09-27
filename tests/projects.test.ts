import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Projects } from '@/components/projects'
import { testProjects } from './support/content'
import { renderComponent } from './support/render'

describe('Projects', () => {
  it('shows the screenshot when a project has one', () => {
    renderComponent(Projects, { projects: testProjects })

    const [pictured] = testProjects.items
    const screenshot = screen.getByRole('img', { name: pictured.imageLabel })

    expect(screenshot).toHaveAttribute('src')
  })

  it('shows a placeholder when a project has no screenshot yet', () => {
    renderComponent(Projects, { projects: testProjects })

    const [, bare] = testProjects.items
    const placeholder = screen.getByRole('img', { name: bare.imageLabel })

    expect(placeholder).toBeVisible()
    expect(placeholder).not.toHaveAttribute('src')
  })
})
