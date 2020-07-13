import React, { useState } from 'react'
import { IProduct } from 'types'
import {
  Modal,
  Button,
  Text,
  TextContent,
  FormGroup,
  TextInput
} from '@patternfly/react-core'
import { useTranslation } from 'i18n/useTranslation'
import { useAlertsContext } from 'components/util'
import { Trans } from 'react-i18next'
// import { Redirect } from 'react-router'

interface Props {
  product: IProduct
  isOpen?: boolean
  onClose: () => void
}

const ProductDeleteModal: React.FunctionComponent<Props> = ({
  product,
  isOpen,
  onClose
}) => {
  const { t } = useTranslation('productOverview')
  const { addAlert } = useAlertsContext()
  const [name, setName] = useState('')

  const isButtonDisabled = name !== product.systemName

  // TODO: when deleteProduct call responds
  // if (status === 200) {
  //   return <Redirect to="/products" />
  // }

  const onClick = () => {
    // TODO: deleteProduct
    onClose()
    addAlert({ id: String(product.id), title: t('delete_modal.alert_success'), variant: 'info' })
  }

  return (
    <Modal
      title={t('delete_modal.title', { product: product.name })}
      width="44%"
      isOpen={isOpen}
      onClose={onClose}
      actions={[
        <Button
          key="delete"
          variant="primary"
          onClick={onClick}
          isDisabled={isButtonDisabled}
          aria-label={t('delete_modal.button_delete_aria_label')}
        >
          {t('delete_modal.button_delete')}
        </Button>,
        <Button
          key="cancel"
          variant="link"
          onClick={onClose}
          aria-label={t('delete_modal.button_cancel_aria_label')}
        >
          {t('delete_modal.button_cancel')}
        </Button>
      ]}
    >
      <TextContent>
        <Text>
          <Trans t={t} i18nKey="delete_modal.body" />
        </Text>
      </TextContent>
      <br />
      <FormGroup
        label={<Trans t={t} i18nKey="delete_modal.input_label" values={{ product: product.systemName }} />}
        fieldId="subject"
      >
        <TextInput
          value={name}
          type="text"
          onChange={setName}
          aria-label={t('delete_modal.input_aria_label')}
        />
      </FormGroup>
    </Modal>
  )
}

export { ProductDeleteModal }
