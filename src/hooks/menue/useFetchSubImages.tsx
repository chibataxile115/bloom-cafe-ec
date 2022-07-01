import { useCallback } from 'react'
// types
import { SubImagesFromFirestore } from '../../types/types'
// Firebase関連
import { DB } from '../../firebase/firebaseConfig'
import { getDocs, collection } from 'firebase/firestore'
import { ConvertFirestoreData } from '../../lib'
// Redux関連
import { useAppDispatch } from '../../redux/app/hooks'
import {
  resetImages,
  addImage,
} from '../../redux/features/menue/subImagesSlice'

export const useFetchSubImages = () => {
  const dispatch = useAppDispatch()

  const getSubImages = useCallback(async (docID: string) => {
    dispatch(resetImages())

    const collRef = collection(DB, `menues/${docID}/imageURLs`).withConverter(
      ConvertFirestoreData<SubImagesFromFirestore>()
    )
    const querySnap = await getDocs(collRef)

    querySnap.forEach((doc) => {
      const docData = doc.data()

      dispatch(addImage(docData.docID, docData.imageName, docData.imageURL))
    })
  }, [])

  return { getSubImages }
}
