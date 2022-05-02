// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit'
import { RootState } from '../../../app/store'
import { CategoryItemsFromFirestore } from '../../../../types/types'

// NOTE: initialStateを定義
const initialState: CategoryItemsFromFirestore[] = []

// NOTE: Sliceを定義する
export const categoryItemsSlice = createSlice({
  name: 'categoryItems',
  initialState,
  reducers: {
    resetCategories: (state) => {
      state.splice(0)
    },
    addCategory: {
      reducer: (state, action: PayloadAction<CategoryItemsFromFirestore>) => {
        state.push(action.payload)
      },
      prepare: (categoryName: string) => {
        return {
          payload: {
            categoryName,
          },
        }
      },
    },
  },
})

// NOTE: actionsをエクスポートする
export const { resetCategories, addCategory } = categoryItemsSlice.actions
// NOTE: selectorをエクスポートする
export const selectCategoryItems = (state: RootState) => state.categoryItems
// NOTE: reducerをエクスポートする
export default categoryItemsSlice.reducer
