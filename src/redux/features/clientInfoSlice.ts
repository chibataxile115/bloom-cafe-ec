// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { ClientInfo } from '../../types/types'

// NOTE: initialStateを定義
const initialState: ClientInfo = {
  zipcode: '',
  prefectures: '',
  municipalities: '',
  addressbuilding: '',
  clientname: '',
  phonenumber: '',
  deliveryday: '',
  deliverytime: '',
}

// NOTE: Sliceを定義する
export const clientInfoSlice = createSlice({
  name: 'clientInfo',
  initialState,
  reducers: {
    updateInfo: (state, action: PayloadAction<ClientInfo>) => {
      state.zipcode = action.payload.zipcode
      state.prefectures = action.payload.prefectures
      state.municipalities = action.payload.municipalities
      state.addressbuilding = action.payload.addressbuilding
      state.clientname = action.payload.clientname
      state.phonenumber = action.payload.phonenumber
      state.deliveryday = action.payload.deliveryday
      state.deliverytime = action.payload.deliverytime
    },
  },
})

// NOTE: actionsをエクスポートする
export const { updateInfo } = clientInfoSlice.actions
// NOTE: selectorをエクスポートする
export const selectClientInfo = (state: RootState) => state.clientInfo
// NOTE: reducerをエクスポートする
export default clientInfoSlice.reducer
