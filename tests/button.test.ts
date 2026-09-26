import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from '@/components/ui/button'
import { buttonLabel } from './support/data'
import { renderComponent } from './support/render'

describe('Button', () => {
  it('renders as a fully rounded gradient pill by default', () => {
    renderComponent(Button, { children: buttonLabel })

    const button = screen.getByRole('button', { name: buttonLabel })

    expect(button).toHaveClass('gradient-primary', 'rounded-full')
  })
})
