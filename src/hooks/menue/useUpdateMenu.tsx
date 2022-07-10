import React, { useCallback } from 'react'
// types
import { MenueFromFirestore } from '../../types/types'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import {
  selectSnackBar,
  changeState as changeStateForSnackBar,
} from '../../redux/features/snackbar/snackbarSlice'
// Firebase関連
import { DB } from '../../firebase/firebaseConfig'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { ConvertFirestoreData } from '../../lib'

type SetMenuDetail = {
  docID: string
  imageURL: string
  plice: number
  name: string
  category: string
  description: string
}

export const useUpdateMenu = () => {
  const dispatch = useAppDispatch()
  const snackBarSelector = useAppSelector(selectSnackBar)

  const updateMenu = useCallback(async (setMenuDetail: SetMenuDetail) => {
    const { docID, imageURL, plice, name, category, description } =
      setMenuDetail

    const docRef = doc(DB, `menues/${docID}`).withConverter(
      ConvertFirestoreData<MenueFromFirestore>()
    )
    const querySnap = await getDoc(docRef)
    const docData = querySnap.data()

    await setDoc(doc(DB, 'menues', docID), {
      docID: docID,
      imageURL: imageURL,
      plice: plice,
      name: name,
      category: category,
      description: description,
      totalPurchase: docData.totalPurchase,
      detailImagesCount: docData.detailImagesCount,
      createdAt: docData.createdAt,
      updatedAt: serverTimestamp(),
    })
      .then(() => {
        dispatch(
          changeStateForSnackBar({
            ...snackBarSelector,
            isOpenTheMenuUpdateSnackbar: true,
            mode: 'success',
          })
        )
        setTimeout(() => {
          dispatch(
            changeStateForSnackBar({
              ...snackBarSelector,
              isOpenTheMenuUpdateSnackbar: false,
              mode: 'success',
            })
          )
        }, 3000)
      })
      .catch(() => {
        dispatch(
          changeStateForSnackBar({
            ...snackBarSelector,
            isOpenTheMenuUpdateSnackbar: true,
            mode: 'error',
          })
        )
        setTimeout(() => {
          dispatch(
            changeStateForSnackBar({
              ...snackBarSelector,
              isOpenTheMenuUpdateSnackbar: false,
              mode: 'success',
            })
          )
        }, 3000)
      })
  }, [])

  return { updateMenu }
}
