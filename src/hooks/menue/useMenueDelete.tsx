import { useCallback } from 'react'
// Firebase関連
import { DB, Storage } from '../../firebase/firebaseConfig'
import { doc, deleteDoc } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import {
  selectAdminPage,
  changeState as changeStateForAdminPage,
} from '../../redux/features/adminPageSlice'
import {
  selectSnackBar,
  changeState as changeStateForSnackBar,
} from '../../redux/features/snackbar/snackbarSlice'

export const useMenueDelete = () => {
  const dispatch = useAppDispatch()
  const adminPageSelector = useAppSelector(selectAdminPage)
  const snackBarSelector = useAppSelector(selectSnackBar)

  const menueDelete = useCallback(
    async (docID: string, imageNames: string[]) => {
      const docRef = doc(DB, `menues/${docID}`)
      await deleteDoc(docRef)
        .then(() => {
          deleteImages(imageNames)
        })
        .catch((error) => {
          dispatch(
            changeStateForSnackBar({
              ...snackBarSelector,
              isOpenTheMenueDeleteSnackbar: true,
              mode: 'error',
            })
          )
          setTimeout(() => {
            dispatch(
              changeStateForSnackBar({
                ...snackBarSelector,
                isOpenTheMenueDeleteSnackbar: false,
                mode: 'error',
              })
            )
          }, 3000)
        })
    },
    []
  )

  const deleteImages = (imageNames: string[]) => {
    imageNames.forEach((imageName, index) => {
      const imageRef = ref(Storage, `menueImages/${imageName}`)
      deleteObject(imageRef)
        .then(() => {
          if (imageNames.length === index + 1) {
            dispatch(
              changeStateForSnackBar({
                ...snackBarSelector,
                isOpenTheMenueDeleteSnackbar: true,
                mode: 'success',
              })
            )
            dispatch(
              changeStateForAdminPage({
                ...adminPageSelector,
                isMenueDetailModal: false,
                isMenueDeleteModal: false,
              })
            )
            setTimeout(() => {
              dispatch(
                changeStateForSnackBar({
                  ...snackBarSelector,
                  isOpenTheMenueDeleteSnackbar: false,
                  mode: 'success',
                })
              )
            }, 3000)
          }
        })
        .catch((error) => {
          dispatch(
            changeStateForSnackBar({
              ...snackBarSelector,
              isOpenTheMenueDeleteSnackbar: true,
              mode: 'error',
            })
          )
          setTimeout(() => {
            dispatch(
              changeStateForSnackBar({
                ...snackBarSelector,
                isOpenTheMenueDeleteSnackbar: false,
                mode: 'error',
              })
            )
          }, 3000)
        })
    })
  }

  return { menueDelete }
}
