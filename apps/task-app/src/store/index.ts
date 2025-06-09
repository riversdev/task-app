import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { tasksApi, tasksSlice } from '@/store/tasks'

export const store = configureStore({
  reducer: {
    // slices
    [tasksSlice.reducerPath]: tasksSlice.reducer,

    // apis
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(tasksApi.middleware),
})

setupListeners(store.dispatch)

export type AppGetState = typeof store.getState
export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<AppGetState>
