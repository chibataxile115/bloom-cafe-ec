import { useEffect, useCallback } from 'react'
// NOTE: Firebase関連
import { DB } from '../../firebase/firebaseConfig'
import { getDocs, collection, query, orderBy, where } from 'firebase/firestore'
// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import {
  selectMenueList,
  addMenue as addMenueForMenueList,
  resetMenue as resetMenueForMenueList,
} from '../../redux/features/menue/menueListSlice'
import { consumers } from 'stream'

export const useFetchMenue = () => {
  const dispatch = useAppDispatch()
  const menueListSelector = useAppSelector(selectMenueList)

  const getMenueList = useCallback(async () => {
    const querySnap = await getDocs(collection(DB, 'menues'))
    let index = 0
    querySnap.forEach((doc) => {
      const docData = doc.data()
      // console.log(`型 : ${typeof docData.id}`)
      dispatch(
        addMenueForMenueList(
          docData.id,
          index,
          docData.name,
          false,
          0,
          docData.imageURL,
          docData.plice,
          true
        )
      )
      index += 1
    })
  }, [])

  return { getMenueList }
}
