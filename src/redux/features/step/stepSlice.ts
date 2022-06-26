// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Step } from '../../../types/types'

// NOTE: initialStateを定義
const initialState: Step = {
  stepIndex: 1,
  isCartModal: false,
}

// NOTE: Sliceを定義する
export const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    resetState: (state: Step) => {
      state.stepIndex = 1
      state.isCartModal = false
    },
    changeState: (state: Step, action: PayloadAction<Step>) => {
      state.stepIndex = action.payload.stepIndex
      // FIXME: 後で削除する
      state.isCartModal = action.payload.isCartModal
    },
  },
})

// NOTE: actionsをエクスポートする
export const { resetState, changeState } = stepSlice.actions
// NOTE: reducerをエクスポートする
export const selectStep = (state: RootState) => state.step
// NOTE: selectorをエクスポートする
export default stepSlice.reducer
