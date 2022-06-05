// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { CartDetail } from '../../types/types'

interface UpdateArg {
  targetMenueCount: number
  targetMenuePlice: number
  mode: 'increment' | 'decrement'
}

// NOTE: initialStateを定義
const initialState: CartDetail = {
  totalCount: 0,
  totalPlice: 0,
}

// NOTE: Sliceを定義する
export const cartdetailSlice = createSlice({
  name: 'cartdetail',
  initialState,
  reducers: {
    resetCount: (state: CartDetail) => {
      state.totalCount = 0
    },
    updateCount: (state: CartDetail, action: PayloadAction<UpdateArg>) => {
      const { targetMenueCount, targetMenuePlice, mode } = action.payload

      const calcedCount = state.totalCount - targetMenueCount
      const caledPlice = state.totalPlice - targetMenuePlice

      if (mode === 'increment') {
        state.totalCount = targetMenueCount
        state.totalPlice = targetMenuePlice
      } else {
        if (calcedCount >= 0 && caledPlice >= 0) {
          state.totalCount = targetMenueCount
          state.totalPlice = targetMenuePlice
        }
      }
    },
    cartIncrementOrder: (state: CartDetail) => {
      state.totalCount = state.totalCount + 1
    },
    cartDecrementOrder: (state: CartDetail) => {
      if (state.totalCount > 0) state.totalCount = state.totalCount - 1
    },
  },
})

// NOTE: actionsをエクスポートする
export const {
  resetCount,
  updateCount,
  cartIncrementOrder,
  cartDecrementOrder,
} = cartdetailSlice.actions
// NOTE: reducerをエクスポートする
export const selectCartDetail = (state: RootState) => state.cartDetail
// NOTE: selectorをエクスポートする
export default cartdetailSlice.reducer
