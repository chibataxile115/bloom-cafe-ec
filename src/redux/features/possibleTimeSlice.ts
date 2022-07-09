// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { possibleTime } from '../../types/types'

interface UpdateTimeArg {
  targetIndex: number
  addedTime: string
}

// NOTE: initialStateを定義
const initialState: possibleTime[] = []

// NOTE: Sliceを定義する
export const possibleTimeSlice = createSlice({
  name: 'possibleTime',
  initialState,
  reducers: {
    resetTime: (state: possibleTime[]) => {
      state.splice(0)
    },
    addTime: {
      reducer: (state: possibleTime[], action: PayloadAction<possibleTime>) => {
        state.push(action.payload)
      },
      prepare: (id: number, time: string) => {
        return {
          payload: {
            id,
            time,
          },
        }
      },
    },

    // 時間を更新
    updateTime: (
      state: possibleTime[],
      action: PayloadAction<UpdateTimeArg>
    ) => {
      const { targetIndex, addedTime } = action.payload
      state[targetIndex].time = addedTime
    },
  },
})

// NOTE: actionsをエクスポートする
export const { resetTime, updateTime } = possibleTimeSlice.actions
// NOTE: reducerをエクスポートする
export const selectpossibleTime = (state: RootState) => state.possibleTime
// NOTE: selectorをエクスポートする
export default possibleTimeSlice.reducer
