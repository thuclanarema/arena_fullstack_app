import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals.js'

import './index.css'
import '@shopify/polaris/build/esm/styles.css'

import { store } from './redux/store.js'
import { Provider } from 'react-redux'

import AppContainer from './AppContainer.jsx'

import enTranslations from '@shopify/polaris/locales/en.json'
import { AppProvider, Frame } from '@shopify/polaris'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <AppProvider i18n={enTranslations}>
        <Frame>
          <AppContainer />
        </Frame>
      </AppProvider>
    </Provider>
  </BrowserRouter>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
