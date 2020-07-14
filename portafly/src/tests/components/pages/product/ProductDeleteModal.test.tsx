import React from 'react'
import { render } from 'tests/custom-render'
import { ProductDeleteModal } from 'components'
import { factories } from 'tests/factories'
import { fireEvent } from '@testing-library/react'

const product = factories.Product.build()
const onClose = jest.fn()

const setup = () => {
  const wrapper = render(<ProductDeleteModal isOpen product={product} onClose={onClose} />)
  const input = wrapper.getByRole('textbox', { name: 'delete_modal.input_aria_label' })
  const okButton = wrapper.getByRole('button', { name: 'delete_modal.button_delete_aria_label' })
  const cancelButton = wrapper.getByRole('button', { name: 'delete_modal.button_delete_aria_label' })
  return {
    ...wrapper,
    input,
    okButton,
    cancelButton
  }
}

it('shuold render properly', () => {
  const { input, okButton, cancelButton } = setup()

  expect(input).toBeInTheDocument()
  expect(okButton).toBeInTheDocument()
  expect(cancelButton).toBeInTheDocument()
})

it('should disable the submit button if system-name is not issued', () => {
  const { okButton, input } = setup()
  expect(okButton).toHaveAttribute('disabled')

  fireEvent.change(input, { target: { value: product.systemName } })
  expect(okButton).not.toHaveAttribute('disabled')
})
