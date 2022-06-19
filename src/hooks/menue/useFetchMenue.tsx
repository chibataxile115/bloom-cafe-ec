import { useCallback } from 'react'
// types
import { MenueFromFirestore } from '../../types/types'
// NOTE: Firebase関連
import { DB } from '../../firebase/firebaseConfig'
import { getDocs, collection } from 'firebase/firestore'
import { ConvertFirestoreData } from '../../lib'
// NOTE: Redux関連
import { useAppDispatch } from '../../redux/app/hooks'
import { addMenue as addMenueForMenueList } from '../../redux/features/menue/menueListSlice'

export const useFetchMenue = () => {
  const dispatch = useAppDispatch()

  const getMenueList = useCallback(async () => {
    const collRef = collection(DB, 'menues').withConverter(
      ConvertFirestoreData<MenueFromFirestore>()
    )
    const querySnap = await getDocs(collRef)

    let index = 0
    querySnap.forEach((doc) => {
      const docData = doc.data()

      dispatch(
        addMenueForMenueList(
          docData.docID,
          index,
          docData.name,
          docData.category,
          false,
          0,
          docData.imageURL,
          docData.plice,
          docData.description,
          true
        )
      )
      index += 1
    })
  }, [])

  return { getMenueList }
}
