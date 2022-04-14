// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { StoringData } from '../../types/types'

interface UpdateArg {
  targetIndex: number
}

// NOTE: initialStateを定義
const initialState: StoringData[] = []

// NOTE: Sliceを定義する
export const storingDataSlice = createSlice({
  name: 'storingData',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.splice(0)
    },
    // 商品を登録
    addOrder: {
      reducer: (state, action: PayloadAction<StoringData>) => {
        state.push(action.payload)
      },
      prepare: (
        id: number,
        name: string,
        isInCart: boolean,
        count: number,
        imageURL: string,
        plice: number
      ) => {
        return {
          payload: {
            id,
            name,
            isInCart,
            count,
            imageURL,
            plice,
          },
        }
      },
    },

    // 商品の注文数を加算
    incrementOrder: (state, action: PayloadAction<UpdateArg>) => {
      if (state.length !== 0) {
        state[action.payload.targetIndex].count =
          state[action.payload.targetIndex].count + 1
      }
    },
    //商品の注文数を減算
    decrementOrder: (state, action: PayloadAction<UpdateArg>) => {
      if (state[action.payload.targetIndex].count > 0) {
        state[action.payload.targetIndex].count =
          state[action.payload.targetIndex].count - 1
      }
    },
  },
})

// NOTE: actionsをエクスポートする
export const { resetOrder, addOrder, incrementOrder, decrementOrder } =
  storingDataSlice.actions
// NOTE: reducerをエクスポートする
export const selectStoringData = (state: RootState) => state.storingData
// NOTE: selectorをエクスポートする
export default storingDataSlice.reducer
