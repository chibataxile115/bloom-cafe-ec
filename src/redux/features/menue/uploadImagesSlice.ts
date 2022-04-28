// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { UploadImage } from '../../../types/types'

// NOTE: initialStateを定義
const initialState: UploadImage[] = []

// NOTE: Sliceを定義する
export const uploadImagesSlice = createSlice({
  name: 'uploadFiles',
  initialState,
  reducers: {
    resetImages: (state) => {
      state.splice(0)
    },
    addImage: {
      reducer: (state, action: PayloadAction<UploadImage>) => {
        state.push(action.payload)
      },
      prepare: (imageName: string, imageURL: string) => {
        return {
          payload: {
            imageName,
            imageURL,
          },
        }
      },
    },
  },
})

// NOTE: actionsをエクスポートする
export const { resetImages, addImage } = uploadImagesSlice.actions
// NOTE: selectorをエクスポートする
export const selectUploadImages = (state: RootState) => state.uploadImages
// NOTE: reducerをエクスポートする
export default uploadImagesSlice.reducer
