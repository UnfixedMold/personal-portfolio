import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ContactAlert } from '@/components/contact/alert'
import { testContactForm, testSite } from './support/content'
import { renderComponent } from './support/render'

describe('ContactAlert', () => {
  it('tells the visitor a failed message can go to the owner by email', () => {
    renderComponent(ContactAlert, {
      status: 'error',
      form: testContactForm,
      email: testSite.email,
    })

    const status = screen.getByRole('status')
    const link = screen.getByRole('link', { name: testSite.email })

    expect(status).toHaveTextContent(testContactForm.error)
    expect(link).toHaveAttribute('href', `mailto:${testSite.email}`)
  })

  it('asks the visitor to try later when they hit the limit', () => {
    renderComponent(ContactAlert, {
      status: 'limited',
      form: testContactForm,
      email: testSite.email,
    })

    const status = screen.getByRole('status')

    expect(status).toHaveTextContent(testContactForm.limited)
  })
})
