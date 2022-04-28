// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { AdminPage } from '../../types/types'

// NOTE: Null許可タイプ
// type Nullable<T> = T | null;

// NOTE: Stateの型を定義する
interface AdminPageState {
  AdminPage: AdminPage
}

// NOTE: initialStateを定義
const initialState: AdminPageState = {
  AdminPage: {
    isMenueSubmitModal: false,
    isMenueSubmitLoading: false,
  },
}

// NOTE: Sliceを定義する
export const adminPageSlice = createSlice({
  name: 'adminPage',
  initialState,
  reducers: {
    resetState: (state) => {
      state.AdminPage = {
        isMenueSubmitModal: false,
        isMenueSubmitLoading: false,
      }
    },
    changeState: (state, action: PayloadAction<AdminPage>) => {
      state.AdminPage.isMenueSubmitModal = action.payload.isMenueSubmitModal
      state.AdminPage.isMenueSubmitLoading = action.payload.isMenueSubmitLoading
    },
  },
})

// NOTE: actionsをエクスポートする
export const { resetState, changeState } = adminPageSlice.actions
// NOTE: selectorをエクスポートする
export const selectAdminPage = (state: RootState) => state.adminPage.AdminPage
// NOTE: reducerをエクスポートする
export default adminPageSlice.reducer
