// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { ClientInfo } from '../../types/types'

// NOTE: initialStateを定義
const initialState: ClientInfo = {
  zipcode: '',
  prefectures: '',
  municipalities: '',
  addressBuilding: '',
  clientName: '',
  phoneNumber: '',
  deliveryDate: '',
  deliveryTime: '',
}
// NOTE: Sliceを定義する
export const clientInfoSlice = createSlice({
  name: 'clientInfo',
  initialState,
  reducers: {
    resetState: (state: ClientInfo) => {
      state = {
        zipcode: '',
        prefectures: '',
        municipalities: '',
        addressBuilding: '',
        clientName: '',
        phoneNumber: '',
        deliveryDate: '',
        deliveryTime: '',
      }
    },
    updateInfo: (state, action: PayloadAction<ClientInfo>) => {
      state.zipcode = action.payload.zipcode
      state.prefectures = action.payload.prefectures
      state.municipalities = action.payload.municipalities
      state.addressBuilding = action.payload.addressBuilding
      state.clientName = action.payload.clientName
      state.phoneNumber = action.payload.phoneNumber
      state.deliveryDate = action.payload.deliveryDate
      state.deliveryTime = action.payload.deliveryTime
    },
  },
})

// NOTE: actionsをエクスポートする
export const { resetState, updateInfo } = clientInfoSlice.actions
// NOTE: selectorをエクスポートする
export const selectClientInfo = (state: RootState) => state.clientInfo
// NOTE: reducerをエクスポートする
export default clientInfoSlice.reducer
