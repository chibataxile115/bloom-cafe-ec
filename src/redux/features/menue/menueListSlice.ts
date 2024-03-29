// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { MenueList } from '../../../types/types'

interface UpdateArg {
  targetIndex: number
  updatedState: boolean
}

interface UpdateCartArg {
  targetIndex: number
  isInCartState: boolean
  addedCount: number
}

// NOTE: initialStateを定義
const initialState: MenueList[] = []

// NOTE: Sliceを定義する
export const menueListSlice = createSlice({
  name: 'menueList',
  initialState,
  reducers: {
    resetMenue: (state: MenueList[]) => {
      state.splice(0)
    },
    addMenue: {
      reducer: (state: MenueList[], action: PayloadAction<MenueList>) => {
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
        plice: number,
        description: string,
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
            description,
            isInit,
          },
        }
      },
    },

    // 商品を更新
    updateCart: (state: MenueList[], action: PayloadAction<UpdateCartArg>) => {
      const { targetIndex, isInCartState, addedCount } = action.payload
      state[targetIndex].isInCart = isInCartState
      state[targetIndex].count = addedCount
    },
    // 商品の注文数を加算
    incrementOrder: (
      state: MenueList[],
      action: PayloadAction<UpdateCartArg>
    ) => {
      if (state.length !== 0) {
        state[action.payload.targetIndex].count =
          state[action.payload.targetIndex].count + 1
      }
    },
    // 商品の注文数を減算
    decrementOrder: (state: MenueList[], action: PayloadAction<UpdateArg>) => {
      if (state[action.payload.targetIndex].count > 0) {
        state[action.payload.targetIndex].count =
          state[action.payload.targetIndex].count - 1
      }
    },
  },
})

// NOTE: actionsをエクスポートする
export const {
  resetMenue,
  addMenue,
  updateCart,
  incrementOrder,
  decrementOrder,
} = menueListSlice.actions
// NOTE: reducerをエクスポートする
export const selectMenueList = (state: RootState) => state.menueList
// NOTE: selectorをエクスポートする
export default menueListSlice.reducer
