// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { SnackBar } from '../../../types/types'
import Slide, { SlideProps } from '@mui/material/Slide'

// NOTE: Null許可タイプ
// type Nullable<T> = T | null;

// NOTE: Stateの型を定義する
interface SnackBarState {
  SnackBar: SnackBar
}

// NOTE: initialStateを定義
const initialState: SnackBar = {
  isOpenTheMenueRegistSnackbar: false,
  isOpenTheImageUploadSnacbar: false,
  isOpenTheMenueDeleteSnackbar: false,
  mode: 'success',
}

// NOTE: Sliceを定義する
export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    resetState: (state: SnackBar) => {
      state = {
        isOpenTheMenueRegistSnackbar: false,
        isOpenTheImageUploadSnacbar: false,
        isOpenTheMenueDeleteSnackbar: false,
        mode: 'success',
      }
    },
    changeState: (state: SnackBar, action: PayloadAction<SnackBar>) => {
      state.isOpenTheMenueRegistSnackbar =
        action.payload.isOpenTheMenueRegistSnackbar
      state.isOpenTheImageUploadSnacbar =
        action.payload.isOpenTheImageUploadSnacbar
      state.isOpenTheMenueDeleteSnackbar =
        action.payload.isOpenTheMenueDeleteSnackbar
      state.mode = action.payload.mode
    },
  },
})

// NOTE: actionsをエクスポートする
export const { resetState, changeState } = snackbarSlice.actions
// NOTE: selectorをエクスポートする
export const selectSnackBar = (state: RootState) => state.snackBar
// NOTE: reducerをエクスポートする
export default snackbarSlice.reducer
