import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

// Reducer
import adminPageReducer from '../features/adminPageSlice'
import authPageReducer from '../features/authPageSlice'
import menuePageReducer from '../features/menuePageSlice'
import userReducer from '../features/userSlice'
import menueItemsReducer from '../features/menue/menueItemsSlice'
import stepReducer from '../features/step/stepSlice'
import storingDataReducer from '../features/storingdateSlice'
import menueListReducer from '../features/menue/menueListSlice'
import adminMenueDetailReducer from '../features/menue/admin/adminMenueDetailSlice'
import CartDetailReducer from '../features/cartdetailSlice'
import uploadImagesReducer from '../features/menue/uploadImagesSlice'
import snackBarReducer from '../features/snackbar/snackbarSlice'
import categoryItemsReducer from '../features/menue/admin/category/categoryItemsSlice'
import subImagesReducer from '../features/menue/subImagesSlice'
import clientInfoReducer from '../features/clientInfoSlice'

const reducer = {
  adminPage: adminPageReducer,
  authPage: authPageReducer,
  menuePage: menuePageReducer,
  user: userReducer,
  menueItems: menueItemsReducer,
  step: stepReducer,
  storingData: storingDataReducer,
  menueList: menueListReducer,
  cartDetail: CartDetailReducer,
  uploadImages: uploadImagesReducer,
  snackBar: snackBarReducer,
  categoryItems: categoryItemsReducer,
  adminMenueDetail: adminMenueDetailReducer,
  subImages: subImagesReducer,
  clientInfo: clientInfoReducer,
}

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development',
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
