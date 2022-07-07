import { Stack, Navigation } from '@shopify/polaris'
import { useLocation } from 'react-router-dom'
import { HomeMinor, CustomersMinor, ProductsMinor } from '@shopify/polaris-icons'

function Layout(props) {
  const { children } = props

  const location = useLocation()

  return (
    <Stack>
      <Stack.Item>
        <Navigation location={location.pathname}>
          <Navigation.Section
            items={[
              {
                url: '/',
                label: 'Home',
                icon: HomeMinor,
                selected: location.pathname === '/',
              },
              {
                url: '/users',
                label: 'Users',
                icon: CustomersMinor,
                selected: location.pathname === '/users',
              },
              {
                url: '/products',
                label: 'Products',
                icon: ProductsMinor,
                selected: location.pathname === '/products',
              },
            ]}
          />
        </Navigation>
      </Stack.Item>
      <Stack.Item fill>{children}</Stack.Item>
    </Stack>
  )
}

export default Layout
