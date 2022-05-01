import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

// Reducer
import userReducer from '../features/userSlice'
import menueItemsReducer from '../features/menue/menueItemsSlice'
import stepReducer from '../features/step/stepSlice'
import storingDataReducer from '../features/storingdateSlice'
import menueListReducer from '../features/menue/menueListSlice'
import CartDetailReducer from '../features/cartdetailSlice'

const reducer = {
  user: userReducer,
  menueItems: menueItemsReducer,
  step: stepReducer,
  storingData: storingDataReducer,
  menueList: menueListReducer,
  cartDetail: CartDetailReducer,
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
