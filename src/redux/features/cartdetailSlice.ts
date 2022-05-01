// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { CartDetail } from '../../types/types'

// NOTE: Stateの型を定義する
interface cartdetailstate {
  CartDetail: CartDetail
}

// NOTE: initialStateを定義
const initialState: cartdetailstate = {
  CartDetail: {
    cartdetailTotal: 0,
  },
}

// NOTE: Sliceを定義する
export const cartdetailSlice = createSlice({
  name: 'cartdetail',
  initialState,
  reducers: {
    resetCount: (state) => {
      state.CartDetail.cartdetailTotal
    },
    cartIncrementOrder: (state) => {
      state.CartDetail.cartdetailTotal = state.CartDetail.cartdetailTotal + 1
    },
    cartDecrementOrder: (state) => {
      state.CartDetail.cartdetailTotal -= 1
    },
  },
})

// NOTE: actionsをエクスポートする
export const { resetCount, cartIncrementOrder, cartDecrementOrder } =
  cartdetailSlice.actions
// NOTE: reducerをエクスポートする
export const selectCartDetail = (state: RootState) =>
  state.cartDetail.CartDetail
// NOTE: selectorをエクスポートする
export default cartdetailSlice.reducer
