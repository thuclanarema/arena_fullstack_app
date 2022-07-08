import Layout from './layout/Layout'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import UsersPage from './pages/Users'
import ProductsPage from './pages/Products'
import { Page } from '@shopify/polaris'

function App(props) {
  return (
    <Layout {...props}>
      <Page>
        <Routes>
          <Route path="/" element={<HomePage {...props} />} />
          <Route path="/users" element={<UsersPage {...props} />} />
          <Route path="/products" element={<ProductsPage {...props} />} />
        </Routes>
      </Page>
    </Layout>
  )
}

export default App
