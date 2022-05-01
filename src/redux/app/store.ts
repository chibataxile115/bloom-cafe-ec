import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

// Reducer
import adminPageReducer from '../features/adminPageSlice'
import authPageReducer from '../features/authPageSlice'
import userReducer from '../features/userSlice'
import menueItemsReducer from '../features/menue/menueItemsSlice'
import stepReducer from '../features/step/stepSlice'
import storingDataReducer from '../features/storingdateSlice'
import menueListReducer from '../features/menue/menueListSlice'
import CartDetailReducer from '../features/cartdetailSlice'
import uploadImagesReducer from '../features/menue/uploadImagesSlice'
import snackBarReducer from '../features/snackbar/snackbarSlice'

const reducer = {
  adminPage: adminPageReducer,
  authPage: authPageReducer,
  user: userReducer,
  menueItems: menueItemsReducer,
  step: stepReducer,
  storingData: storingDataReducer,
  menueList: menueListReducer,
  cartDetail: CartDetailReducer,
  uploadImages: uploadImagesReducer,
  snackBar: snackBarReducer,
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
