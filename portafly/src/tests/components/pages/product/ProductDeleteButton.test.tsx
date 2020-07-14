import React from 'react'
import { render } from 'tests/custom-render'
import { ProductDeleteButton } from 'components'
import { fireEvent } from '@testing-library/react'
import { factories } from 'tests/factories'

const product = factories.Product.build()

const setup = () => {
  const wrapper = render(<ProductDeleteButton product={product} />)
  const button = wrapper.getByRole('button', { name: 'delete_button.aria_label' })
  return { ...wrapper, button }
}

it('should render properly', () => {
  const { button } = setup()
  expect(button).toBeInTheDocument()
})

it('show a confirmation modal when clicked', () => {
  const { button, queryByText } = setup()

  expect(queryByText('delete_modal.title')).toBeNull()

  fireEvent.click(button)
  expect(queryByText('delete_modal.title')).toBeInTheDocument()
})
