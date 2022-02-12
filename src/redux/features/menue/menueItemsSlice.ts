// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { MenueItems } from '../../../types/types'

// NOTE: Null許可タイプ
// type Nullable<T> = T | null;

// NOTE: initialStateを定義
const initialState: MenueItems[] = []

// NOTE: Sliceを定義する
export const menueItemsSlice = createSlice({
  name: 'menueItems',
  initialState,
  reducers: {
    resetState: (state) => {
      state.splice(0)
    },
    // FIXME: 指定したindexのオブジェクトを削除する処理を後で追加する
    menueAdd: {
      reducer: (state, action: PayloadAction<MenueItems>) => {
        state.push(action.payload)
      },
      prepare: (id: number, plice: number, name: string, quantity: number) => {
        return {
          payload: {
            id,
            plice,
            name,
            quantity,
          },
        }
      },
    },
  },
})

// NOTE: actionsをエクスポートする
export const { resetState, menueAdd } = menueItemsSlice.actions
// NOTE: reducerをエクスポートする
export const selectMenueItems = (state: RootState) => state.menueItems
// NOTE: selectorをエクスポートする
export default menueItemsSlice.reducer
