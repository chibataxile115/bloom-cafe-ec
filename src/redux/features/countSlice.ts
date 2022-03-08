// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { Count } from '../../types/types'

// NOTE: Stateの型を定義する
interface countState {
  Count: Count
}

// NOTE: initialStateを定義
const initialState: countState = {
  Count: {
    countCart: 0,
  },
}

const cart = [
  {
    menue: "12345A",
    count: 5
  },
  {
    menue: "12345A",
    count: 5
  },
  {
    menue: "12345A",
    count: 5
  },
  {
    menue: "12345A",
    count: 5
  },
]

const Cart = cart[0]
Cart.count


// NOTE: Sliceを定義する
export const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    resetCount: (state) => {
      state.Count.countCart
    },
    increment: (state) => {
      state.Count.countCart += 1
    },
    decrement: (state) => {
      state.Count.countCart -= 1
    },
  },
})

// NOTE: actionsをエクスポートする
export const { resetCount, increment, decrement } = countSlice.actions
// NOTE: reducerをエクスポートする
export const selectCount = (state: RootState) => state.count.Count
// NOTE: selectorをエクスポートする
export default countSlice.reducer
