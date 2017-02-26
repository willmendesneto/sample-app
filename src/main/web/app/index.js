import 'react-hot-loader/patch'
import 'babel-polyfill'

import ReactDOM from 'react-dom'
import React from 'react'
import { useRouterHistory } from 'react-router'
import { createHistory } from 'history'
import { createStore, applyMiddleware } from 'redux'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { AppContainer } from 'react-hot-loader'

import rootReducer, { getDefaultInitialState } from './reducers'
import Root from './containers/Root'

import '../style/common.css'

// Needed for onTouchTap, see http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

// Initial Redux Store state is pulled from each reducer's initial state definition.
const initialState = getDefaultInitialState()

// Store development enhancers
const enhancers = []
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

// Set up the router history off the base application name.
const browserHistory = useRouterHistory(createHistory)({ basename: '/sample-app' })
const historyRouterMiddleware = routerMiddleware(browserHistory)

// Build up the store.
const createStoreWithMiddleware = applyMiddleware(historyRouterMiddleware)(createStore)
const store = createStoreWithMiddleware(rootReducer, initialState, ...enhancers)
const history = syncHistoryWithStore(browserHistory, store)

function renderApp (RootComponent) {
  ReactDOM.render(
    <AppContainer>
      <RootComponent store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  )
}

renderApp(Root)

if (module.hot) {
  module.hot.accept(
    './containers/Root',
    () => renderApp(Root)
  )
}
