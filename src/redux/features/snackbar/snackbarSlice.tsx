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
const initialState: SnackBarState = {
  SnackBar: {
    isOpenTheMenueRegistSnackbar: false,
    isOpenTheImageUploadSnacbar: false,
    mode: 'success',
  },
}

// NOTE: Sliceを定義する
export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    resetState: (state) => {
      state.SnackBar = {
        isOpenTheMenueRegistSnackbar: false,
        isOpenTheImageUploadSnacbar: false,
        mode: 'success',
      }
    },
    changeState: (state, action: PayloadAction<SnackBar>) => {
      state.SnackBar.isOpenTheMenueRegistSnackbar =
        action.payload.isOpenTheMenueRegistSnackbar
      state.SnackBar.isOpenTheImageUploadSnacbar =
        action.payload.isOpenTheImageUploadSnacbar
      state.SnackBar.mode = action.payload.mode
    },
  },
})

// NOTE: actionsをエクスポートする
export const { resetState, changeState } = snackbarSlice.actions
// NOTE: selectorをエクスポートする
export const selectSnackBar = (state: RootState) => state.snackBar.SnackBar
// NOTE: reducerをエクスポートする
export default snackbarSlice.reducer
