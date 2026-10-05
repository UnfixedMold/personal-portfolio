import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ContactSent } from '@/components/contact/sent'
import { testContactForm } from './support/content'
import { renderComponent } from './support/render'

describe('ContactSent', () => {
  it('thanks the visitor and offers to send another message', () => {
    renderComponent(ContactSent, {
      success: testContactForm.success,
      onReset: () => undefined,
    })

    const title = screen.getByRole('heading', {
      name: testContactForm.success.title,
    })
    const again = screen.getByRole('button', {
      name: testContactForm.success.again,
    })

    expect(title).toHaveFocus()
    expect(screen.getByRole('status')).toHaveTextContent(
      testContactForm.success.text
    )
    expect(again).toBeVisible()
  })
})
