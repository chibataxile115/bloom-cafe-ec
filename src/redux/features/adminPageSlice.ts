// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { AdminPage } from '../../types/types'

// NOTE: initialStateを定義
const initialState: AdminPage = {
  isMenueSubmitModal: false,
  isMenueSubmitLoading: false,
  isMenueDetailModal: false,
  isMenueDeleteModal: false,
}

// NOTE: Sliceを定義する
export const adminPageSlice = createSlice({
  name: 'adminPage',
  initialState,
  reducers: {
    resetState: (state: AdminPage) => {
      state = {
        isMenueSubmitModal: false,
        isMenueSubmitLoading: false,
        isMenueDetailModal: false,
        isMenueDeleteModal: false,
      }
    },
    changeState: (state: AdminPage, action: PayloadAction<AdminPage>) => {
      state.isMenueSubmitModal = action.payload.isMenueSubmitModal
      state.isMenueSubmitLoading = action.payload.isMenueSubmitLoading
      state.isMenueDetailModal = action.payload.isMenueDetailModal
      state.isMenueDeleteModal = action.payload.isMenueDeleteModal
    },
  },
})

// NOTE: actionsをエクスポートする
export const { resetState, changeState } = adminPageSlice.actions
// NOTE: selectorをエクスポートする
export const selectAdminPage = (state: RootState) => state.adminPage
// NOTE: reducerをエクスポートする
export default adminPageSlice.reducer
