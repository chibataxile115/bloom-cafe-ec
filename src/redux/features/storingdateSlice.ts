// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { StoringData } from '../../types/types'

interface UpdateArg {
  targetIndex: number
}

interface UpdateArg2 {
  targetIndex: number
  isInCartState: boolean
  countState: number
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
    // 商品を更新
    updateDetail: (state, action: PayloadAction<UpdateArg2>) => {
      const { targetIndex, isInCartState, countState } = action.payload
      state[targetIndex].isInCart = isInCartState
      state[targetIndex].count = countState
    },
  },
})

// NOTE: actionsをエクスポートする
export const { resetOrder, addOrder, updateDetail } = storingDataSlice.actions
// NOTE: reducerをエクスポートする
export const selectStoringData = (state: RootState) => state.storingData
// NOTE: selectorをエクスポートする
export default storingDataSlice.reducer
