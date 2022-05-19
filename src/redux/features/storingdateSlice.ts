// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { StoringData } from '../../types/types'

interface UpdateArg {
  targetIndex: number
}

interface UpdateArg2 {
  targetIndex: number
  updateCart: boolean
}

// NOTE: initialStateを定義
const initialState: StoringData[] = []

// NOTE: Sliceを定義する
export const storingDataSlice = createSlice({
  name: 'storingData',
  initialState,
  reducers: {
    resetOrder: (state: StoringData[]) => {
      state.splice(0)
    },
    updatedCart: (state: StoringData[], action: PayloadAction<UpdateArg2>) => {
      state[action.payload.targetIndex].isInCart = action.payload.updateCart
    },

    // 商品を登録
    addOrder: {
      reducer: (state: StoringData[], action: PayloadAction<StoringData>) => {
        state.push(action.payload)
      },
      prepare: (
        docID: string,
        id: number,
        name: string,
        category: string,
        isInCart: boolean,
        count: number,
        imageURL: string,
        plice: string,
        isInit: boolean
      ) => {
        return {
          payload: {
            docID,
            id,
            name,
            category,
            isInCart,
            count,
            imageURL,
            plice,
            isInit,
          },
        }
      },
    },
  },
})

// NOTE: actionsをエクスポートする
export const { resetOrder, addOrder, updatedCart } = storingDataSlice.actions
// NOTE: reducerをエクスポートする
export const selectStoringData = (state: RootState) => state.storingData
// NOTE: selectorをエクスポートする
export default storingDataSlice.reducer
