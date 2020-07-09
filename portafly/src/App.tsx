import 'react-app-polyfill/ie11'
import React from 'react'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'
import { AuthProvider } from 'auth'
import {
  SwitchWith404,
  LazyRoute,
  Root,
  AlertsProvider
} from 'components'
import { LastLocationProvider } from 'react-router-last-location'

const OverviewPage = React.lazy(() => import('components/pages/Overview'))
const ApplicationsPage = React.lazy(() => import('components/pages/applications/ApplicationsIndexPage'))
const AccountsIndexPage = React.lazy(() => import('components/pages/accounts/AccountsIndexPage'))
const CreateProductPage = React.lazy(() => import('components/pages/product/CreateProductPage'))

const PagesSwitch = () => (
  <SwitchWith404>
    <LazyRoute path="/" exact render={() => <OverviewPage />} />
    <LazyRoute path="/applications" exact render={() => <ApplicationsPage />} />
    <LazyRoute path="/accounts" exact render={() => <AccountsIndexPage />} />
    <LazyRoute path="/products/new" exact render={() => <CreateProductPage />} />
    <Redirect path="/overview" to="/" exact />
  </SwitchWith404>
)

const App = () => (
  <AuthProvider>
    <Router>
      <LastLocationProvider>
        <AlertsProvider>
          <Root>
            <PagesSwitch />
          </Root>
        </AlertsProvider>
      </LastLocationProvider>
    </Router>
  </AuthProvider>
)

export { App }
