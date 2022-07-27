import { Card, Stack } from '@shopify/polaris'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProductApi from '../../api/product'
import AppHeader from '../../components/AppHeader'
import Table from './Table'
import qs from 'query-string'
import PagePreloader from '../../components/PagePreloader'
import MyPagination from '../../components/MyPagination'
import CreateForm from './CreateForm'
import ConfirmDelete from './ConfirmDelete'
import VendorApi from '../../api/vendor'

function ProductsPage(props) {
  const { actions } = props

  const location = useLocation()

  const [isReady, setIsReady] = useState(false)
  const [products, setProducts] = useState(null)
  const [vendors, setVendors] = useState(null)
  const [created, setCreated] = useState(null)
  const [deleted, setDeleted] = useState(null)

  useEffect(() => {
    if (!isReady && products) {
      setIsReady(true)
    }
  })

  const getVendors = async (query) => {
    try {
      actions.showAppLoading()

      let res = await VendorApi.find(query)
      if (!res.success) {
        throw res.error
      }

      setVendors(res.data)
    } catch (error) {
      console.log(error)
      actions.showNotify({ error: true, message: error.message })
    } finally {
      actions.hideAppLoading()
    }
  }

  useEffect(() => {
    getVendors('?page=1&limit=10')
  }, [])

  const getProducts = async (query) => {
    try {
      actions.showAppLoading()

      let res = await ProductApi.find(query)
      if (!res.success) {
        throw res.error
      }

      setProducts(res.data)
    } catch (error) {
      console.log(error)
      actions.showNotify({ error: true, message: error.message })
    } finally {
      actions.hideAppLoading()
    }
  }

  useEffect(() => {
    console.log('useEffect location')
    console.log(qs.parse(location.search))
    getProducts(location.search)
  }, [location])

  if (!isReady) {
    return <PagePreloader />
  }

  if (created) {
    return (
      <CreateForm
        {...props}
        vendor={vendors}
        created={created}
        onDiscard={() => setCreated(null)}
        onSubmit={() => {}}
      />
    )
  }

  return (
    <Stack vertical alignment="fill">
      <AppHeader
        title="Products"
        actions={[
          {
            label: 'Add product',
            primary: true,
            onClick: () => setCreated({}),
          },
        ]}
      />

      <Card>
        <Card.Section>
          <Table
            {...props}
            {...(products || [])}
            onEdit={(item) => setCreated(item)}
            onDelete={(item) => setDeleted(item)}
          />
        </Card.Section>

        <Card.Section>
          <MyPagination
            page={products.page}
            limit={products.limit}
            totalPages={products.totalPages}
            // onChange={({ page, limit }) => handleFilter({ page, limit })}
          />
        </Card.Section>
      </Card>
      {deleted && <ConfirmDelete />}
    </Stack>
  )
}

export default ProductsPage
