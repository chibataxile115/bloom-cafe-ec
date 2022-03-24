// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { AuthPage } from '../../types/types'

// NOTE: Null許可タイプ
// type Nullable<T> = T | null;

// NOTE: Stateの型を定義する
interface AuthPageState {
  AuthPage: AuthPage
}

// NOTE: initialStateを定義
const initialState: AuthPageState = {
  AuthPage: {
    email: '',
    password: '',
    isLogin: true,
    modal: false,
    reset: false,
    showPassword: false,
    isLoading: false,
  },
}

// NOTE: Sliceを定義する
export const AuthPageSlice = createSlice({
  name: 'authPage',
  initialState,
  reducers: {
    resetState: (state) => {
      state.AuthPage = {
        email: '',
        password: '',
        isLogin: true,
        modal: false,
        reset: false,
        showPassword: false,
        isLoading: false,
      }
    },
    changeState: (state, action: PayloadAction<AuthPage>) => {
      state.AuthPage.email = action.payload.email
      state.AuthPage.password = action.payload.password
      state.AuthPage.isLogin = action.payload.isLogin
      state.AuthPage.modal = action.payload.modal
      state.AuthPage.reset = action.payload.reset
      state.AuthPage.showPassword = action.payload.showPassword
      state.AuthPage.isLoading = action.payload.isLoading
    },
  },
})

// NOTE: actionsをエクスポートする
export const { resetState, changeState } = AuthPageSlice.actions
// NOTE: reducerをエクスポートする
export const selectAuthPage = (state: RootState) => state.authPage.AuthPage
// NOTE: selectorをエクスポートする
export default AuthPageSlice.reducer
