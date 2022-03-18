import { useEffect, useCallback } from 'react'
// NOTE: Firebase関連
import { DB } from '../../firebase/firebaseConfig'
import { getDocs, collection, query, orderBy, where } from 'firebase/firestore'
// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import {
  selectMenueList,
  addMenue,
} from '../../redux/features/menue/menueListSlice'

export const useFetchMenue = () => {
  const dispatch = useAppDispatch()
  const menueListSelector = useAppSelector(selectMenueList)

  const getMenueList = async () => {
    const querySnap = await getDocs(collection(DB, 'menues'))
    querySnap.forEach((doc) => {
      const docData = doc.data()
      console.log(doc.data().name)
      dispatch(
        addMenue(
          docData.id,
          docData.name,
          false,
          0,
          'https://www.google.com',
          docData.plice
        )
      )
    })
  }

  useEffect(() => {
    getMenueList()
  }, [])

  return {}
}
