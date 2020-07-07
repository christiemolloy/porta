import React from 'react'
import { IProduct } from 'types'
import { useTranslation } from 'i18n/useTranslation'
import { Button } from '@patternfly/react-core'

interface Props {
  product: IProduct
}

const ProductLink: React.FunctionComponent<Props> = ({ product }) => {
  // @ts-ignore TODO: add strings file
  const { t } = useTranslation('productsIndex')

  return (
    <Button
      aria-label={t('products_table.product_overview_link_aria_label')}
      component="a"
      variant="link"
      href={`/products/${product.id}`} // TODO: probably wrong path
      isInline
    >
      {product.name}
    </Button>
  )
}

export { ProductLink }
