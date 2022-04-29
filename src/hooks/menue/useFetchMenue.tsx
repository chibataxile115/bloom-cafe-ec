import { useCallback } from 'react'
// NOTE: Firebase関連
import { DB } from '../../firebase/firebaseConfig'
import { getDocs, collection, query, orderBy, where } from 'firebase/firestore'
import { ConvertFirestoreData } from '../../lib'
// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import {
  selectMenueList,
  addMenue as addMenueForMenueList,
} from '../../redux/features/menue/menueListSlice'
interface dataType {
  createdAt: Date
  category: string
  detailImagesCount: number
  plice: string
  imageURL: string
  updatedAt: Date
  docID: string
  name: string
}

export const useFetchMenue = () => {
  const dispatch = useAppDispatch()
  const menueListSelector = useAppSelector(selectMenueList)

  const getMenueList = useCallback(async () => {
    const collRef = collection(DB, 'menues').withConverter(
      ConvertFirestoreData<dataType>()
    )
    const querySnap = await getDocs(collRef)

    let index = 0
    querySnap.forEach((doc) => {
      const docData = doc.data()
      const data = docData

      dispatch(
        addMenueForMenueList(
          data.docID,
          index,
          data.name,
          false,
          0,
          data.imageURL,
          data.plice,
          true
        )
      )
      index += 1
    })
  }, [])

  return { getMenueList }
}
