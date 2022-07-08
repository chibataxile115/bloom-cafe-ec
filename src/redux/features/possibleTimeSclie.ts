// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { possibleTime } from '../../types/types'

// NOTE: initialStateを定義
const initialState: possibleTime = {
  setTimes: '',
}

// NOTE: Sliceを定義する
export const possibleTimeSlice = createSlice({
  name: 'possibleTime',
  initialState,
  reducers: {
    resetState: (state: possibleTime) => {
      state.setTimes = ''
    },
    changeState: (state: possibleTime, action: PayloadAction<possibleTime>) => {
      state.setTimes = action.payload.setTimes
    },
  },
})

// NOTE: actionsをエクスポートする
export const { resetState, changeState } = possibleTimeSlice.actions
// NOTE: selectorをエクスポートする
export const selectpossibleTime = (state: RootState) => state.possibleTime
// NOTE: reducerをエクスポートする
export default possibleTimeSlice.reducer
