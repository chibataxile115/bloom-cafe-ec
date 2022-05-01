// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Step } from '../../../types/types'

// NOTE: Stateの型を定義する
interface stepState {
  Step: Step
}

// NOTE: initialStateを定義
const initialState: stepState = {
  Step: {
    stepIndex: 0,
    isCartModal: false,
  },
}

// NOTE: Sliceを定義する
export const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    resetState: (state) => {
      state.Step = {
        stepIndex: 0,
        isCartModal: false,
      }
    },
    changeState: (state, action: PayloadAction<Step>) => {
      state.Step.stepIndex = action.payload.stepIndex
      // FIXME: 後で削除する
      state.Step.isCartModal = action.payload.isCartModal
    },
  },
})

// NOTE: actionsをエクスポートする
export const { resetState, changeState } = stepSlice.actions
// NOTE: reducerをエクスポートする
export const selectStep = (state: RootState) => state.step.Step
// NOTE: selectorをエクスポートする
export default stepSlice.reducer
