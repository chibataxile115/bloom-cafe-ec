// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../app/store'
import { AdminMenueDetail } from '../../../../types/types'

// NOTE: initialStateを定義
const initialState: AdminMenueDetail = {
  docID: '',
  id: 0,
  name: '',
  category: '',
  count: 0,
  imageURL: '',
  plice: '',
}

// NOTE: Sliceを定義する
export const adminMenueDetailSlice = createSlice({
  name: 'menueDetail',
  initialState,
  reducers: {
    resetState: (state: AdminMenueDetail) => {
      state.docID = ''
      state.id = 0
      state.name = ''
      state.category = ''
      state.count = 0
      state.imageURL = ''
      state.plice = ''
    },
    changeState: (
      state: AdminMenueDetail,
      action: PayloadAction<AdminMenueDetail>
    ) => {
      state.docID = action.payload.docID
      state.id = action.payload.id
      state.name = action.payload.name
      state.category = action.payload.category
      state.count = action.payload.count
      state.imageURL = action.payload.imageURL
      state.plice = action.payload.plice
    },
  },
})

// NOTE: actionsをエクスポートする
export const { resetState, changeState } = adminMenueDetailSlice.actions
// NOTE: selectorをエクスポートする
export const selectAdminMenueDetail = (state: RootState) =>
  state.adminMenueDetail
// NOTE: reducerをエクスポートする
export default adminMenueDetailSlice.reducer
