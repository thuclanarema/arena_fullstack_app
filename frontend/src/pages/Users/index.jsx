import { Button, Card, Stack } from '@shopify/polaris'
import { useState, useEffect } from 'react'
import CountryApi from '../../api/country'
import UserApi from '../../api/user'
import AppHeader from '../../components/AppHeader/index.jsx'
import MyPagination from '../../components/MyPagination'
import PagePreloader from '../../components/PagePreloader'
import ConfirmDelete from './ConfirmDelete'
import CreateForm from './CreateForm'
import Table from './Table.jsx'

function UsersPage(props) {
  const { actions } = props

  const [isReady, setIsReady] = useState(false)
  const [users, setUsers] = useState(null)
  const [countries, setCountries] = useState(null)
  const [created, setCreated] = useState({})
  const [deleted, setDeleted] = useState(null)

  useEffect(() => console.log('created :>> ', created), [created])

  const getUsers = async ({ page, limit }) => {
    try {
      actions.showAppLoading()

      let res = await UserApi.find({ page, limit })
      if (!res.success) {
        throw res.error
      }

      setUsers(res.data)
    } catch (error) {
      console.log(error)
      actions.showNotify({ error: true, message: error.message })
    } finally {
      actions.hideAppLoading()
    }
  }

  const getCountries = async ({ page, limit }) => {
    try {
      actions.showAppLoading()

      let res = await CountryApi.find({ page, limit })
      if (!res.success) {
        throw res.error
      }

      setCountries(res.data)
    } catch (error) {
      console.log(error)
      actions.showNotify({ error: true, message: error.message })
    } finally {
      actions.hideAppLoading()
    }
  }

  useEffect(() => {
    getUsers({})
    getCountries({ page: 1, limit: 200 })
  }, [])

  useEffect(() => {
    if (!isReady && users && countries) {
      setIsReady(true)
    }
  })

  const handleSubmit = async (formData) => {
    try {
      actions.showAppLoading()

      let data = {}
      Object.keys(formData)
        .filter((key) => !['confirmPassword'].includes(key))
        .forEach((key) => (formData[key].value ? (data[key] = formData[key].value) : null))

      let res = null
      if (created?.id) {
        // update
        res = await UserApi.update(created.id, data)
      } else {
        // create
        res = await UserApi.create(data)
      }
      if (!res.success) {
        throw res.error
      }

      actions.showNotify({ message: created?.id ? 'Saved' : 'Added' })

      setCreated(null)
      getUsers({})
    } catch (error) {
      console.log(error)
      actions.showNotify({ error: true, message: error.message })
    } finally {
      actions.hideAppLoading()
    }
  }

  const handleDelete = async () => {
    try {
      actions.showAppLoading()

      let res = await UserApi.delete(deleted.id)
      if (!res.success) {
        throw res.error
      }

      actions.showNotify({ message: 'Deleted' })

      setDeleted(null)
      getUsers({ page: users.page, limit: users.limit })
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    } finally {
      actions.hideAppLoading()
    }
  }

  if (!isReady) {
    return <PagePreloader />
  }

  if (created) {
    return (
      <CreateForm
        {...props}
        created={created}
        onDiscard={() => setCreated(null)}
        onSubmit={(formData) => handleSubmit(formData)}
        countries={countries?.items || []}
      />
    )
  }

  return (
    <>
      <Stack vertical alignment="fill">
        <Stack.Item>
          <AppHeader
            title="Users"
            actions={[
              {
                label: 'Add user',
                primary: true,
                onClick: () => setCreated({}),
              },
            ]}
          />
        </Stack.Item>

        <Stack.Item>
          <Card sectioned>
            <Stack vertical fill>
              <Stack.Item>
                <div>
                  Total items: <b>{users.totalItems}</b>
                </div>
              </Stack.Item>
              <Stack.Item>
                <Table
                  {...props}
                  users={users}
                  onEdit={(item) => setCreated(item)}
                  onDelete={(item) => setDeleted(item)}
                />
              </Stack.Item>
              <Stack.Item>
                <MyPagination
                  page={users.page}
                  limit={users.limit}
                  totalPages={users.totalPages}
                  onChange={({ page, limit }) => getUsers({ page, limit })}
                />
              </Stack.Item>
            </Stack>
          </Card>
        </Stack.Item>
      </Stack>

      {deleted && <ConfirmDelete onDiscard={() => setDeleted(null)} onSubmit={handleDelete} />}
    </>
  )
}

export default UsersPage
