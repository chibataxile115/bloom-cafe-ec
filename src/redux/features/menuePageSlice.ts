// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { MenuePage } from '../../types/types'

// NOTE: initialStateを定義
const initialState: MenuePage = {
  isOpenCartModal: false,
}

// NOTE: Sliceを定義する
export const menuePageSlice = createSlice({
  name: 'menuePage',
  initialState,
  reducers: {
    resetState: (state) => {
      state = {
        isOpenCartModal: false,
      }
    },
    changeState: (state, action: PayloadAction<MenuePage>) => {
      state.isOpenCartModal = action.payload.isOpenCartModal
    },
  },
})

// NOTE: actionsをエクスポートする
export const { resetState, changeState } = menuePageSlice.actions
// NOTE: reducerをエクスポートする
export const selectMenuePage = (state: RootState) => state.menuePage
// NOTE: selectorをエクスポートする
export default menuePageSlice.reducer
