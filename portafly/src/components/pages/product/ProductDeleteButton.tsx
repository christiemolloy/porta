import React, { useState } from 'react'
import { useTranslation } from 'i18n/useTranslation'
import { Button } from '@patternfly/react-core'
import { IProduct } from 'types'
import { ProductDeleteModal } from './ProductDeleteModal'

import './productDeleteButton.scss'

interface Props {
  product: IProduct,
}

const ProductDeleteButton: React.FunctionComponent<Props> = ({ product }) => {
  const { t } = useTranslation('productOverview')
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        className="pf-m-secondary-danger"
        aria-label={t('delete_button.aria_label')}
        component="button"
        variant="danger"
        isInline
        onClick={() => setIsModalOpen(true)}
      >
        {t('delete_button.title')}
      </Button>

      {product && (
        <ProductDeleteModal
          product={product}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

export { ProductDeleteButton }
