import { configureStore } from '@reduxjs/toolkit'
import timeRangeReducer from './timeRangeSlice'
import orderSlice from './orderSlice'
import customDate from './customDateSlice'
const store = configureStore({
  reducer: {
    timeRange: timeRangeReducer,
    orders: orderSlice,
    customDate: customDate
  }
})

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch