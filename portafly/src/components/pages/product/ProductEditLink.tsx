import React from 'react'
import { useTranslation } from 'i18n/useTranslation'
import { Button } from '@patternfly/react-core'
import { IProduct } from 'types'

interface Props {
  product: IProduct
}

const ProductEditLink: React.FunctionComponent<Props> = ({ product }) => {
  const { t } = useTranslation('productOverview')

  return (
    <Button
      aria-label={t('edit_link.aria_label')}
      component="a"
      variant="secondary"
      href={`/products/${product?.id}/edit`} // TODO: probably wrong path
      isInline
    >
      {t('edit_link.title')}
    </Button>
  )
}

export { ProductEditLink }
