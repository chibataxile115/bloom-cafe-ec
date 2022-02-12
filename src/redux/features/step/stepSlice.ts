// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Step } from '../../../types/types'

// NOTE: Null許可タイプ
// type Nullable<T> = T | null;

// NOTE: Stateの型を定義する
interface stepState {
  Step: Step
}

// NOTE: initialStateを定義
const initialState: stepState = {
  Step: {
    stepIndex: 0,
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
      }
    },
    changeState: (state, action: PayloadAction<Step>) => {
      state.Step.stepIndex = action.payload.stepIndex
    },
  },
})

// NOTE: actionsをエクスポートする
export const { resetState, changeState } = stepSlice.actions
// NOTE: reducerをエクスポートする
export const selectStep = (state: RootState) => state.step.Step
// NOTE: selectorをエクスポートする
export default stepSlice.reducer
