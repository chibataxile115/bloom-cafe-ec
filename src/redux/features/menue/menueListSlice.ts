// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { MenueList } from '../../../types/types'

// interface UpdateArg {
//   targetIndex: number
//   updatedCount: number
// }

// NOTE: initialStateを定義
const initialState: MenueList[] = []

// NOTE: Sliceを定義する
export const menueListSlice = createSlice({
  name: 'menueList',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.splice(0)
    },
    addMenue: {
      reducer: (state, action: PayloadAction<MenueList>) => {
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
    // updateOrder: (state, action: PayloadAction<UpdateArg>) => {
    //   // 配列にコピー
    //   let cartList = state.slice()
    //   state[action.payload.targetIndex].count = action.payload.updatedCount
    // },

    // deleteOrder: (state) => {
    //   state.Count.countCart -= 1
    // },
  },
})

// NOTE: actionsをエクスポートする
export const { resetOrder, addMenue } = menueListSlice.actions
// NOTE: reducerをエクスポートする
export const selectMenueList = (state: RootState) => state.menueList
// NOTE: selectorをエクスポートする
export default menueListSlice.reducer
