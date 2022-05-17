import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { SubImagesFromFirestore } from '../../../types/types'

type SubImages = Omit<SubImagesFromFirestore, 'createdAt' | 'updatedAt'>

const initialState: SubImages[] = []

export const subImagesSlice = createSlice({
  name: 'subImages',
  initialState,
  reducers: {
    resetImages: (state: SubImages[]) => {
      state.splice(0)
    },
    addImage: {
      reducer: (state: SubImages[], action: PayloadAction<SubImages>) => {
        state.push(action.payload)
      },
      prepare: (docID: number, imageName: string, imageURL: string) => {
        return {
          payload: {
            docID,
            imageName,
            imageURL,
          },
        }
      },
    },
  },
})

export const { resetImages, addImage } = subImagesSlice.actions
export const selectSubImages = (state: RootState) => state.subImages
export default subImagesSlice.reducer
