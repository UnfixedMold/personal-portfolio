import { render } from '@testing-library/react'
import { createElement, type ComponentType } from 'react'

export function renderComponent<P extends object>(
  component: ComponentType<P>,
  props: P
) {
  return render(createElement(component, props))
}
