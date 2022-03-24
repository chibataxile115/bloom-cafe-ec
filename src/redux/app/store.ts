import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

// Reducer
import authPageReducer from '../features/authPageSlice'
import userReducer from '../features/userSlice'
import menueItemsReducer from '../features/menue/menueItemsSlice'
import stepReducer from '../features/step/stepSlice'
import storingDataReducer from '../features/storingdateSlice'
import menueListReducer from '../features/menue/menueListSlice'

const reducer = {
  authPage: authPageReducer,
  user: userReducer,
  menueItems: menueItemsReducer,
  step: stepReducer,
  storingData: storingDataReducer,
  menueList: menueListReducer,
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
