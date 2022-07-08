import { Stack, Navigation } from '@shopify/polaris'
import { useLocation } from 'react-router-dom'
import { HomeMinor, CustomersMinor, ProductsMinor } from '@shopify/polaris-icons'
import routes from '../../routes'

function Layout(props) {
  const { children } = props

  const location = useLocation()

  const renderIcon = (path) => {
    switch (path) {
      case '/':
        return HomeMinor
        break

      case '/users':
        return CustomersMinor
        break

      case '/products':
        return ProductsMinor
        break

      default:
        return undefined
        break
    }
  }

  let items = routes.map((item) => ({
    url: item.path,
    label: item.title,
    icon: renderIcon(item.path),
    selected: location.pathname === item.path,
  }))

  return (
    <Stack wrap={false}>
      <Stack.Item>
        <Navigation location={location.pathname}>
          <Navigation.Section items={items} />
        </Navigation>
      </Stack.Item>
      <Stack.Item fill>{children}</Stack.Item>
    </Stack>
  )
}

export default Layout
