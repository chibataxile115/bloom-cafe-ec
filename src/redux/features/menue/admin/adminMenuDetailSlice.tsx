// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../app/store'
import { AdminMenuDetail } from '../../../../types/types'

// NOTE: initialStateを定義
const initialState: AdminMenuDetail = {
  docID: '',
  id: 0,
  name: '',
  category: '',
  count: 0,
  imageURL: '',
  plice: 0,
  description: '',
}

// NOTE: Sliceを定義する
export const adminMenuDetailSlice = createSlice({
  name: 'menueDetail',
  initialState,
  reducers: {
    resetState: (state: AdminMenuDetail) => {
      state.docID = ''
      state.id = 0
      state.name = ''
      state.category = ''
      state.count = 0
      state.imageURL = ''
      state.plice = 0
      state.description = ''
    },
    changeState: (
      state: AdminMenuDetail,
      action: PayloadAction<AdminMenuDetail>
    ) => {
      state.docID = action.payload.docID
      state.id = action.payload.id
      state.name = action.payload.name
      state.category = action.payload.category
      state.count = action.payload.count
      state.imageURL = action.payload.imageURL
      state.plice = action.payload.plice
      state.description = action.payload.description
    },
  },
})

// NOTE: actionsをエクスポートする
export const { resetState, changeState } = adminMenuDetailSlice.actions
// NOTE: selectorをエクスポートする
export const selectAdminMenueDetail = (state: RootState) =>
  state.adminMenuDetail
// NOTE: reducerをエクスポートする
export default adminMenuDetailSlice.reducer
