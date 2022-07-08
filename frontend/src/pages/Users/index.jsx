import { Card, Pagination, Stack } from '@shopify/polaris'
import { useState, useEffect } from 'react'
import CountryApi from '../../api/country'
import UserApi from '../../api/user'
import AppHeader from '../../components/AppHeader/index.jsx'
import PagePreloader from '../../components/PagePreloader'
import CreateForm from './CreateForm'
import Table from './Table.jsx'

function UsersPage(props) {
  const { actions } = props

  const [isReady, setIsReady] = useState(false)
  const [users, setUsers] = useState(null)
  const [countries, setCountries] = useState(null)
  const [created, setCreated] = useState(null)
  const [deleted, setDeleted] = useState(null)

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

  if (!isReady) {
    return <PagePreloader />
  }

  if (created) {
    return (
      <CreateForm
        {...props}
        created={created}
        onDiscard={() => setCreated(null)}
        onSubmit={() => setCreated(null)}
        countries={countries?.items || []}
      />
    )
  }

  return (
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
              <Stack distribution="center">
                <Stack.Item>
                  <Pagination
                    label={`${users.page} of ${users.totalPages}`}
                    hasPrevious={users.page > 1}
                    onPrevious={() => {
                      getUsers({ page: users.page - 1, limit: users.limit })
                    }}
                    hasNext={users.page < users.totalPages}
                    onNext={() => {
                      getUsers({ page: users.page + 1, limit: users.limit })
                    }}
                  />
                </Stack.Item>
              </Stack>
            </Stack.Item>
          </Stack>
        </Card>
      </Stack.Item>
    </Stack>
  )
}

export default UsersPage
