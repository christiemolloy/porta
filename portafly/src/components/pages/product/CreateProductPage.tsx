import React, {
  useState, FormEventHandler, FocusEventHandler, useEffect
} from 'react'

import {
  PageSection,
  TextContent,
  Text,
  Card,
  CardBody,
  Form,
  FormGroup,
  TextInput,
  TextArea,
  ActionGroup,
  Button
} from '@patternfly/react-core'
import { useTranslation } from 'i18n/useTranslation'
import { useHistory, Redirect } from 'react-router'
import { createProduct, NewProduct } from 'dal/products'
import { useAsync } from 'react-async'
import { useAlertsContext } from 'components/util'
import { ValidationException } from 'utils'

type Validations = Record<string, {
  validation: 'default' | 'success' | 'error',
  errors?: string[]
}>

const CreateProductPage = () => {
  // @ts-ignore missing strings file
  const { t } = useTranslation('createProduct')
  const { goBack } = useHistory()
  const { addAlert } = useAlertsContext()

  const [name, setName] = useState('')
  const [systemName, setSystemName] = useState('')
  const [description, setDescription] = useState('')
  const [validations, setValidations] = useState<Validations>({
    name: { validation: 'default' },
    system_name: { validation: 'default' },
    description: { validation: 'default' }
  })

  const {
    isPending, error, run, data
  } = useAsync({ deferFn: createProduct })

  useEffect(() => {
    if (error) {
      if (Object.prototype.hasOwnProperty.call(error, 'validationErrors')) {
        const { validationErrors } = (error as unknown as ValidationException)
        const newValidations: Validations = {}
        Object.keys(validationErrors).forEach((id) => {
          newValidations[id] = {
            validation: 'error',
            errors: validationErrors[id]
          }
        })
        setValidations({ ...validations, ...newValidations })
      } else {
        addAlert({ id: String(Date.now()), title: error.message, variant: 'danger' })
      }
    }
  }, [error])

  if (data) {
    const { service } = data as NewProduct
    return <Redirect to={`/products/${service.id}`} />
  }

  const isValid = validations.name.validation === 'success' && validations.system_name.validation !== 'error'

  const validate = (inputName: string) => {
    switch (inputName) {
      case 'name':
        return name.length > 5 ? 'success' : 'error'
      case 'system_name':
        // eslint-disable-next-line no-nested-ternary
        return !systemName ? 'default' : (systemName.length > 5 ? 'success' : 'error')
      case 'description':
        return description.length > 0 ? 'success' : 'default'
      default:
        return 'default'
    }
  }

  const onBlur: FocusEventHandler = (ev) => {
    const { name: inputName } = ev.currentTarget as HTMLInputElement

    const newValidations = { ...validations }

    newValidations[inputName] = {
      validation: validate(inputName)
    }

    setValidations(newValidations)
  }

  const onSubmit: FormEventHandler = (ev) => {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget as HTMLFormElement)
    run(formData)
  }

  return (
    <>
      <PageSection variant="light">
        <TextContent>
          <Text component="h1">{t('New API Product')}</Text>
        </TextContent>
      </PageSection>

      <PageSection>
        <Card>
          <CardBody>
            <Form onSubmit={onSubmit}>
              <FormGroup
                label={t('Name')}
                fieldId="name"
                helperTextInvalid={validations.name.errors?.flat()}
                validated={validations.name.validation}
                isRequired
              >
                <TextInput
                  validated={validations.name.validation}
                  id="name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={setName}
                  onBlur={onBlur}
                  isRequired
                />
              </FormGroup>
              <FormGroup
                label={t('System name')}
                fieldId="system_name"
                helperText={t('Only ASCII letters, numbers...')}
                helperTextInvalid={validations.system_name.errors?.flat()}
                validated={validations.system_name.validation}
              >
                <TextInput
                  validated={validations.system_name.validation}
                  id="system_name"
                  type="text"
                  name="system_name"
                  value={systemName}
                  onChange={setSystemName}
                  onBlur={onBlur}
                />
              </FormGroup>
              <FormGroup
                label={t('Description')}
                fieldId="description"
                helperTextInvalid={validations.description.errors?.flat()}
                validated={validations.description.validation}
              >
                <TextArea
                  validated={validations.description.validation}
                  id="description"
                  name="description"
                  value={description}
                  onChange={setDescription}
                  onBlur={onBlur}
                />
              </FormGroup>
              <ActionGroup>
                <Button type="submit" isDisabled={isPending || !isValid} variant="primary">{t('Create')}</Button>
                <Button onClick={goBack} variant="link">{t('Cancel')}</Button>
              </ActionGroup>
            </Form>
          </CardBody>
        </Card>
      </PageSection>
    </>
  )
}

// Default export needed for React.lazy
// eslint-disable-next-line import/no-default-export
export default CreateProductPage
