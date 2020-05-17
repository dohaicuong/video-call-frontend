import 'webrtc-adapter'

import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from 'serviceWorker'

import { RelayEnvironmentProvider } from 'react-relay/hooks'
import environment from './providers/RelayProviders/environment'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import routes from 'routes'

import { ThemeProvider, CssBaseline } from '@material-ui/core'
import theme from 'providers/Theme/theme'

import { SnackbarProvider } from 'notistack'

const root = document.getElementById('root') as HTMLElement
ReactDOM
  .unstable_createRoot(root)
  .render(
    <RelayEnvironmentProvider environment={environment}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <Router>
            <Switch>
              <React.Suspense fallback='Loading...'>
                {routes.map(route => <Route key={route.path} {...route} />)}
              </React.Suspense>
            </Switch>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </RelayEnvironmentProvider>
  )

serviceWorker.unregister()
