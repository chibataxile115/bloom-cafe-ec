// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { CartDetail } from '../../types/types'

interface UpdateArg {
  targetMenueCount: number
}

// NOTE: initialStateを定義
const initialState: CartDetail = {
  cartdetailTotal: 0,
}

// NOTE: Sliceを定義する
export const cartdetailSlice = createSlice({
  name: 'cartdetail',
  initialState,
  reducers: {
    resetCount: (state: CartDetail) => {
      state.cartdetailTotal = 0
    },
    updateCount: (state: CartDetail, action: PayloadAction<UpdateArg>) => {
      const { targetMenueCount } = action.payload

      const calcedCount = state.cartdetailTotal - targetMenueCount
      if (calcedCount >= 0) {
        state.cartdetailTotal = calcedCount
      }
    },
    cartIncrementOrder: (state: CartDetail) => {
      state.cartdetailTotal = state.cartdetailTotal + 1
    },
    cartDecrementOrder: (state: CartDetail) => {
      if (state.cartdetailTotal > 0)
        state.cartdetailTotal = state.cartdetailTotal - 1
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
