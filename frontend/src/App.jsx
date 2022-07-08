import Layout from './layout/Layout'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import UsersPage from './pages/Users'
import ProductsPage from './pages/Products'
import { Page } from '@shopify/polaris'
import routes from './routes.js'

function App(props) {
  const renderElement = (path) => {
    switch (path) {
      case '/':
        return <HomePage {...props} />
        break

      case '/users':
        return <UsersPage {...props} />
        break

      case '/products':
        return <ProductsPage {...props} />
        break

      default:
        return undefined
        break
    }
  }

  let items = routes.map((item) => ({
    path: item.path,
    exact: item.exact,
    element: renderElement(item.path),
  }))

  return (
    <Layout {...props}>
      <Page>
        <Routes>
          {items.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
        </Routes>
      </Page>
    </Layout>
  )
}

export default App
