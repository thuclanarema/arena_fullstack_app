import { Stack, Navigation } from '@shopify/polaris'
import { useLocation } from 'react-router-dom'

function Layout(props) {
  const { children, routes } = props

  const location = useLocation()

  return (
    <Stack wrap={false}>
      <Stack.Item>
        <Navigation location={location.pathname}>
          <Navigation.Section
            items={routes.map((item) => ({
              url: item.path,
              label: item.title,
              icon: item.icon,
              selected: location.pathname === item.path,
            }))}
          />
        </Navigation>
      </Stack.Item>
      <Stack.Item fill>{children}</Stack.Item>
    </Stack>
  )
}

export default Layout
