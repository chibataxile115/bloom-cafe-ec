// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { StoringData } from '../../types/types'

interface UpdateArg {
  targetIndex: number
  updatedCount: number
}

// NOTE: initialStateを定義
const initialState: StoringData[] = []

// NOTE: Sliceを定義する
export const storingDataSlice = createSlice({
  name: 'storingData',
  initialState,
  reducers: {
    // もう一度注文する場合
    resetOrder: (state) => {
      state.splice(0)
    },
    addOrder: {
      reducer: (state, action: PayloadAction<StoringData>) => {
        state.push(action.payload)
      },
      prepare: (
        count: number,
        plice: number,
        imageURL: string,
        name: string
      ) => {
        return {
          payload: {
            count,
            plice,
            imageURL,
            name,
          },
        }
      },
    },
    updateOrder: (state, action: PayloadAction<UpdateArg>) => {
      // 配列にコピー
      let cartList = state.slice()
      state[action.payload.targetIndex].count = action.payload.updatedCount
    },
    // deleteOrder: (state) => {
    //   state.Count.countCart -= 1
    // },
  },
})

// NOTE: actionsをエクスポートする
export const { resetOrder, addOrder, updateOrder } = storingDataSlice.actions
// NOTE: reducerをエクスポートする
export const selectStoringData = (state: RootState) => state.storingData
// NOTE: selectorをエクスポートする
export default storingDataSlice.reducer
