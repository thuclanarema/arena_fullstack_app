import React, { useState } from 'react'
import { useEffect } from 'react'
import UserApi from '../../api/user'

function UsersPage(props) {
  const { actions } = props

  const [users, setUsers] = useState(null)

  const find = async () => {
    try {
      let res = await UserApi.find()
      console.log('res :>> ', res)
    } catch (error) {}
  }

  useEffect(() => {
    find()
  }, [])

  return <div>UsersPage</div>
}

export default UsersPage
