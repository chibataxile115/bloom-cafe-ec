import { useCallback } from 'react'
// Originals
import { SubmitMenueArgs } from '../../types/types'
// Custom Hook
import { useCreateUniqueStr } from '../useCreateUniqueStr'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import {
  selectAdminPage,
  changeState as changeStateForAdminPage,
} from '../../redux/features/adminPageSlice'
import { resetImages } from '../../redux/features/menue/uploadImagesSlice'
import {
  selectSnackBar,
  changeState as changeStateForSnackBar,
} from '../../redux/features/snackbar/snackbarSlice'
// Firebase関連
import { DB, Storage } from '../../firebase/firebaseConfig'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

interface SetMenue {
  menueID: string
  imageName: string
  plice: string
  name: string
  category: string
}
interface SetImage {
  id: number
  menueID: string
  imageName: string
}

export const useSubmitMenue = () => {
  const dispatch = useAppDispatch()
  const adminPageSelector = useAppSelector(selectAdminPage)
  const snackBarSelector = useAppSelector(selectSnackBar)

  // メニューを登録する関数
  const submitMenue = useCallback(async (args: SubmitMenueArgs) => {
    const { uploadImages, menueDetail } = args

    uploadImages.forEach(async (item, index) => {
      const arrayLen = uploadImages.length

      const blob = await fetch(item.imageURL).then((result) => {
        return result.blob()
      })
      const processedImageName = useCreateUniqueStr(item.imageName, '_')

      const uploadImage = uploadBytesResumable(
        ref(Storage, `menueImages/${processedImageName}`),
        blob
      )

      uploadImage.on(
        'state_changed',
        () => {},
        (err) => {
          alert(err.message)
        },
        async () => {
          const setMenue: SetMenue = {
            menueID: menueDetail.menueIDL + '-' + menueDetail.menueIDR,
            imageName: processedImageName,
            plice: menueDetail.plice,
            name: menueDetail.name,
            category: menueDetail.category,
          }
          const setImage: SetImage = {
            id: index,
            menueID: menueDetail.menueIDL + '-' + menueDetail.menueIDR,
            imageName: processedImageName,
          }

          if (index < 1) await setMenueToFirestore(setMenue)
          await setSubImagesToFirestore(setImage, arrayLen)
        }
      )
    })
  }, [])

  // メニューデータを登録する関数
  const setMenueToFirestore = useCallback(async (setMenue: SetMenue) => {
    const { imageName, menueID, plice, name, category } = setMenue

    getDownloadURL(ref(Storage, `menueImages/${imageName}`))
      .then(async (imageURL) => {
        await setDoc(doc(DB, 'menues', menueID), {
          docID: menueID,
          imageURL: imageURL,
          plice: plice,
          name: name,
          category: category,
          detailImagesCount: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
        await setDoc(
          doc(DB, 'menues', 'categories', 'categoryItems', category),
          {
            categoryName: category,
            createdAt: serverTimestamp(),
          }
        )
      })
      .catch((error) => {
        console.error(error.message)
        dispatch(
          changeStateForSnackBar({
            ...snackBarSelector,
            isOpenTheMenueRegistSnackbar: true,
            mode: 'error',
          })
        )
        setTimeout(() => {
          dispatch(
            changeStateForSnackBar({
              ...snackBarSelector,
              isOpenTheMenueRegistSnackbar: false,
            })
          )
        }, 3000)
      })
  }, [])

  // メニュー毎の画像をサブコレクションに登録する関数
  const setSubImagesToFirestore = useCallback(
    async (setImage: SetImage, arrayLen: number) => {
      const { id, menueID, imageName } = setImage

      getDownloadURL(ref(Storage, `menueImages/${imageName}`))
        .then(async (imageURL) => {
          await setDoc(doc(DB, 'menues', menueID, 'imageURLs', String(id)), {
            docID: id,
            imageURL: imageURL,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          })
        })
        .then(() => {
          if (arrayLen - 1 === id) {
            // ローディングOFF
            dispatch(
              changeStateForAdminPage({
                ...adminPageSelector,
                isMenueSubmitModal: true,
                isMenueSubmitLoading: false,
              })
            )
            dispatch(resetImages())
            dispatch(
              changeStateForSnackBar({
                ...snackBarSelector,
                isOpenTheMenueRegistSnackbar: true,
                mode: 'success',
              })
            )
            setTimeout(() => {
              dispatch(
                changeStateForSnackBar({
                  ...snackBarSelector,
                  isOpenTheMenueRegistSnackbar: false,
                })
              )
            }, 3000)
          }
        })
        .catch((error) => {
          console.error(error.message)
          dispatch(
            changeStateForSnackBar({
              ...snackBarSelector,
              isOpenTheMenueRegistSnackbar: true,
              mode: 'error',
            })
          )
          setTimeout(() => {
            dispatch(
              changeStateForSnackBar({
                ...snackBarSelector,
                isOpenTheMenueRegistSnackbar: false,
              })
            )
          }, 3000)
        })
    },
    []
  )

  return { submitMenue }
}
