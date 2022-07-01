import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

// Reducer
import adminPageReducer from '../features/adminPageSlice'
import authPageReducer from '../features/authPageSlice'
import menuePageReducer from '../features/menuePageSlice'
import userReducer from '../features/userSlice'
import stepReducer from '../features/step/stepSlice'
import menueListReducer from '../features/menue/menueListSlice'
import adminMenuDetailReducer from '../features/menue/admin/adminMenuDetailSlice'
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
  step: stepReducer,
  menueList: menueListReducer,
  cartDetail: CartDetailReducer,
  uploadImages: uploadImagesReducer,
  snackBar: snackBarReducer,
  categoryItems: categoryItemsReducer,
  adminMenuDetail: adminMenuDetailReducer,
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
