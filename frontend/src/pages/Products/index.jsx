import { Card, Stack } from '@shopify/polaris'
import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import ProductApi from '../../api/product'
import AppHeader from '../../components/AppHeader'
import Table from './Table'
import qs from 'query-string'
import PagePreloader from '../../components/PagePreloader'
import MyPagination from '../../components/MyPagination'
import CreateForm from './CreateForm'
import ConfirmDelete from './ConfirmDelete'
import VendorApi from '../../api/vendor'
import UploadApi from '../../api/upload'
import Filter from './Filter'

function ProductsPage(props) {
  const { actions } = props

  const location = useLocation()

  const [searchParams, setSearchParams] = useSearchParams()

  const [isReady, setIsReady] = useState(false)
  const [products, setProducts] = useState(null)
  const [vendors, setVendors] = useState(null)
  const [created, setCreated] = useState(null)
  const [deleted, setDeleted] = useState(null)

  useEffect(() => {
    if (!isReady && products && vendors) {
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
    getProducts(location.search)
  }, [location])

  const handleSubmit = async (formData) => {
    try {
      actions.showAppLoading()

      // handle upload images
      if (formData['thumbnail'].value) {
        let images = await UploadApi.upload([formData['thumbnail'].value])
        if (!images.success) {
          actions.showNotify({ error: true, message: images.error.message })
        }
        formData['thumbnail'].value = images.data[0]
      } else if (formData['thumbnail'].originValue) {
        formData['thumbnail'].value = formData['thumbnail'].originValue
      }

      if (formData['images'].value.length) {
        let images = await UploadApi.upload(formData['images'].value)
        if (!images.success) {
          actions.showNotify({ error: true, message: images.error.message })
        }
        formData['images'].value = [...images.data, ...formData['images'].originValue]
      } else if (formData['images'].originValue.length) {
        formData['images'].value = formData['images'].originValue
      }

      let data = {}
      Object.keys(formData)
        .filter((key) => !['images'].includes(key))
        .forEach((key) => (formData[key].value ? (data[key] = formData[key].value) : null))

      if (formData['thumbnail'].value) {
        data['thumbnail'] = formData['thumbnail'].value
      } else {
        data['thumbnail'] = ''
      }

      if (formData['images'].value.length) {
        data['images'] = formData['images'].value
      } else {
        data['images'] = []
      }

      console.log('data', data)
      let res = null
      if (created?.id) {
        // update

        res = await ProductApi.update(created.id, data)

        console.log('res', res)
      } else {
        // create
        res = await ProductApi.create(data)
      }
      if (!res.success) {
        throw res.error
      }

      actions.showNotify({ message: created?.id ? 'Saved' : 'Added' })

      setCreated(null)
      setSearchParams(qs.parse(location.search))
    } catch (error) {
      console.log(error)
      actions.showNotify({ error: true, message: error.message })
    } finally {
      actions.hideAppLoading()
    }
  }

  const handleDelete = async (deleted) => {
    try {
      actions.showAppLoading()

      let res = await ProductApi.delete(deleted.id)

      if (!res.success) {
        throw res.error
      }
      actions.showNotify({ message: 'Deleted' })
      setSearchParams()
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    } finally {
      actions.hideAppLoading()
    }
  }

  const handleFilter = (filter) => {
    let params = qs.parse(location.search)
    console.log('params :>> ', params)
    if ('page' in filter) {
      if (filter.page) {
        params = { ...params, page: filter.page }
      } else {
        delete params.page
      }
    }
    if ('limit' in filter) {
      if (filter.limnit) {
        params = { ...params, limit: filter.limit }
      } else {
        delete params.limit
      }
    }
    if ('status' in filter) {
      console.log('filter.status :>> ', filter.status)
      if (filter.status) {
        params = { ...params, status: filter.status }
      } else {
        delete params.status
      }
    }

    if ('publish' in filter) {
      if (filter.publish) {
        params = { ...params, publish: filter.publish }
      } else {
        delete params.publish
      }
    }

    if ('vendorId' in filter) {
      if (filter.vendorId) {
        params = { ...params, vendorId: filter.vendorId }
      } else {
        delete params.vendorId
      }
    }
    if ('keyword' in filter) {
      if (filter.keyword) {
        params = { ...params, keyword: filter.keyword }
      } else {
        delete params.keyword
      }
    }

    if ('price' in filter) {
      if (filter.price) {
        params = { ...params, price: filter.price }
      } else {
        delete params.price
      }
    }

    setSearchParams(params)
  }

  if (!isReady) {
    return <PagePreloader />
  }

  if (created) {
    return (
      <CreateForm
        {...props}
        vendors={vendors.items || []}
        created={created}
        onDiscard={() => setCreated(null)}
        onSubmit={(formData) => handleSubmit(formData)}
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
          <Filter
            vendors={vendors.items}
            filter={qs.parse(location.search)}
            onChange={(filter) => handleFilter(filter)}
          />
        </Card.Section>

        <Card.Section>
          <div>Total items: {products.itemsTotal}</div>
        </Card.Section>

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
            onChange={({ page, limit }) => handleFilter({ page, limit })}
          />
        </Card.Section>
      </Card>
      {deleted && (
        <ConfirmDelete
          onDiscard={() => setDeleted(null)}
          onSubmit={() => handleDelete(deleted) & setDeleted(null)}
        />
      )}
    </Stack>
  )
}

export default ProductsPage
