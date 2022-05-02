import { useCallback } from 'react'
// types
import { CategoryItemsFromFirestore } from '../../types/types'
// Firebase関連
import { DB } from '../../firebase/firebaseConfig'
import { getDocs, collection } from 'firebase/firestore'
import { ConvertFirestoreData } from '../../lib'
// Redux関連
import { useAppDispatch } from '../../redux/app/hooks'
import {
  resetCategories,
  addCategory,
} from '../../redux/features/menue/category/categoryItemsSlice'

export const useFetchByCategory = () => {
  const dispatch = useAppDispatch()

  const getCategoryList = useCallback(async () => {
    dispatch(resetCategories())

    const collRef = collection(
      DB,
      'menues/categories/categoryItems'
    ).withConverter(ConvertFirestoreData<CategoryItemsFromFirestore>())
    const querySnap = await getDocs(collRef)

    let categoryList: CategoryItemsFromFirestore[] = []
    querySnap.forEach((doc) => {
      const docData = doc.data()

      dispatch(addCategory(docData.categoryName))
    })

    return categoryList
  }, [])

  return { getCategoryList }
}
