import logo from './logo.svg'
import './App.css'
import Layout from './layout/Layout'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import UsersPage from './pages/Users'
import ProductsPage from './pages/Products'
import { Page } from '@shopify/polaris'

import CONFIG from './config'

console.log('CONFIG :>> ', CONFIG);

function App(props) {
  console.log('App props :>> ', props)
  return (
    <Layout {...props}>
      <Page>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </Page>
    </Layout>
  )
}

export default App
