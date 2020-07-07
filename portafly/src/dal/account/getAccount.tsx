import { craftRequest, fetchData } from 'utils'
import { IAccountOverview, State } from 'types'
import { PromiseFn } from 'react-async'

type Account = {
  id: number
  created_at: string
  updated_at: string
  credit_card_stored: boolean
  monthly_billing_enabled: boolean
  monthly_charging_enabled: boolean
  state: string
  links: Array<{
    rel: string,
    href: string
  }>
  org_name: string
}

const parseAccount = (account: Account) => ({
  publicDomain: '', // TODO: add public_domain to method response
  adminDomain: '', // TODO: add admin_domain to method response
  planName: '', // TODO: add plan_name to method response
  id: account.id,
  adminName: 'Mr. Todo', // TODO: add admin_name to method response
  adminEmail: 'todo@todo.do', // TODO: add admin_email to method response
  createdAt: account.created_at,
  state: account.state as State,
  updatedAt: account.updated_at,
  orgName: account.org_name,
  applications: []
})

const getAccount: PromiseFn<IAccountOverview> = async ({ accountId }) => {
  const request = craftRequest(`/admin/api/accounts/${accountId}.json`, new URLSearchParams({
    page: '1',
    perPage: '500'
  }))
  const data = await fetchData<{ account: Account }>(request)
  return parseAccount(data.account)
}

export { getAccount }
