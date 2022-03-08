import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

// Reducer
import userReducer from '../features/userSlice'
import menueItemsReducer from '../features/menue/menueItemsSlice'
import stepReducer from '../features/step/stepSlice'
import countReducer from '../features/countSlice'

const reducer = {
  user: userReducer,
  menueItems: menueItemsReducer,
  step: stepReducer,
  count: countReducer
}

export const store = configureStore({
  reducer,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
