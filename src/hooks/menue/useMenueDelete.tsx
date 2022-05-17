import { useCallback } from 'react'
// Firebase関連
import { DB, Storage } from '../../firebase/firebaseConfig'
import { doc, getDocs, deleteDoc, collection, query } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import {
  selectAdminPage,
  changeState as changeStateForAdminPage,
} from '../../redux/features/adminPageSlice'

export const useMenueDelete = () => {
  const dispatch = useAppDispatch()
  const adminPageSelector = useAppSelector(selectAdminPage)

  const menueDelete = useCallback(
    async (docID: string, imageNames: string[]) => {
      const docRef = doc(DB, `menues/${docID}`)
      await deleteDoc(docRef)

      deleteImages(imageNames)
    },
    []
  )

  const deleteImages = (imageNames: string[]) => {
    imageNames.forEach((imageName, index) => {
      const imageRef = ref(Storage, `menueImages/${imageName}`)
      deleteObject(imageRef)

      if (imageNames.length === index + 1) {
        dispatch(
          changeStateForAdminPage({
            ...adminPageSelector,
            isMenueDetailModal: false,
            isMenueDeleteModal: false,
          })
        )
      }
    })
  }

  return { menueDelete }
}
