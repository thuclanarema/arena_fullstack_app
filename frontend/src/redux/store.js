import { configureStore } from '@reduxjs/toolkit'
import notify from './reducers/notify.js'
import appLoading from './reducers/appLoading.js'

export const store = configureStore({
  reducer: {
    notify,
    appLoading,
  },
})
