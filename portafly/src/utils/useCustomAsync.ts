import { useAsync, AsyncOptions, AsyncState } from 'react-async'
import { ValidationErrors, ValidationException } from 'utils'

type CustomAsyncState<T> = AsyncState<T> & { validationErrors?: ValidationErrors}

// FIXME: this causes an infinite loop.
const useCustomAsync = <T>(options: AsyncOptions<T>): CustomAsyncState<T> => {
  const state = useAsync(options)

  const { error } = state

  const validationErrors = (error && Object.prototype.hasOwnProperty.call(error, 'validationErrors'))
    ? (error as unknown as ValidationException).validationErrors
    : undefined

  return { ...state, validationErrors }
}

export { useCustomAsync }
