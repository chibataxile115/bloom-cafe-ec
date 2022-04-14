// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { MenueList } from '../../../types/types'

interface UpdateArg {
  targetIndex: number
  updatedState: boolean
}

// NOTE: initialStateを定義
const initialState: MenueList[] = []

// NOTE: Sliceを定義する
export const menueListSlice = createSlice({
  name: 'menueList',
  initialState,
  reducers: {
    resetMenue: (state) => {
      state.splice(0)
    },
    // TODO: 新しい関数を作成する
    // TODO: 受け取った引数に応じてtrue or falseを代入するようにする
    // TODO: state[targetIndex].isInit = updatedState

    updatedMenue: (state, action: PayloadAction<UpdateArg>) => {
      state[action.payload.targetIndex].isInit = action.payload.updatedState
    },

    addMenue: {
      reducer: (state, action: PayloadAction<MenueList>) => {
        state.push(action.payload)
      },
      prepare: (
        documentId: string,
        id: number,
        name: string,
        isInCart: boolean,
        count: number,
        imageURL: string,
        plice: number,
        isInit: boolean
      ) => {
        return {
          payload: {
            documentId,
            id,
            name,
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
export const { resetMenue, addMenue, updatedMenue } = menueListSlice.actions
// NOTE: reducerをエクスポートする
export const selectMenueList = (state: RootState) => state.menueList
// NOTE: selectorをエクスポートする
export default menueListSlice.reducer
