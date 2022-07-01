import { useEffect } from 'react'
// Originals
import { AdminBasicModal } from '../'
// Custom Hook
import { useMenueDelete } from '../../../../hooks/menue/useMenueDelete'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../../../redux/app/hooks'
import {
  selectAdminPage,
  changeState as changeStateForAdminPage,
} from '../../../../redux/features/adminPageSlice'
import { selectAdminMenueDetail } from '../../../../redux/features/menue/admin/adminMenuDetailSlice'
import { selectSubImages } from '../../../../redux/features/menue/subImagesSlice'

// NOTE: Firebase関連
import { DB, Storage } from '../../../../firebase/firebaseConfig'
import { doc, getDocs, deleteDoc, collection, query } from 'firebase/firestore'

const MenueDeleteModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const adminPageSelector = useAppSelector(selectAdminPage)
  const adminMenueDetailSelector = useAppSelector(selectAdminMenueDetail)
  const subImagesSelector = useAppSelector(selectSubImages)

  const { menueDelete } = useMenueDelete()

  const handleModalClose = () => {
    dispatch(
      changeStateForAdminPage({
        ...adminPageSelector,
        isMenueDeleteModal: false,
      })
    )
  }

  const handleDelete = () => {
    const imageNames = subImagesSelector.map((item) => {
      return item.imageName
    })
    menueDelete(adminMenueDetailSelector.docID, imageNames)
  }

  useEffect(() => {}, [])

  return (
    <AdminBasicModal isOpenModal={adminPageSelector.isMenueDeleteModal}>
      <div className="flex flex-col justify-center rounded-md">
        {/* ヘッダー */}
        <div className="relative flex items-center justify-center">
          <h1 className="items-center justify-center text-center text-2xl font-bold">
            商品の削除
          </h1>

          {/* close button */}
          <div className="absolute right-0 p-2">
            <button
              type="button"
              className="
              ml-auto inline-flex
              items-center
              rounded-lg bg-transparent
              p-1.5
              text-sm
              text-gray-400
              hover:bg-gray-200 hover:text-gray-900
              dark:hover:bg-gray-800 dark:hover:text-white
              "
              data-modal-toggle="authentication-modal"
              onClick={handleModalClose}
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* modal contents */}
        <div className="mt-10 flex flex-row rounded-md bg-red-200 p-2 text-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-8 w-8 items-center justify-center text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <h3 className="mx-1 items-center justify-center rounded-md bg-gray-200 px-2 text-red-500">
            {adminMenueDetailSelector.name}
          </h3>
          <h3 className="text-red-500">
            は商品データベースから完全に削除されます。
          </h3>
        </div>

        <div className="flex flex-row justify-end space-x-6">
          {/* キャンセルボタン */}
          <div>
            <button
              className="
              focus:shadow-outline
              mx-auto mt-20 mb-2
              w-[120px] min-w-[120px] rounded-md
              bg-gray-300
              py-2 px-4 font-bold
              text-gray-700
              hover:bg-gray-400 hover:text-gray-800
              focus:outline-none
              "
              onClick={handleModalClose}
            >
              キャンセル
            </button>
          </div>
          {/* 削除ボタン */}
          <div>
            <button
              className="
              focus:shadow-outline
              mx-auto mt-20 mb-2
              w-[80px] min-w-[80px] rounded-md
              bg-red-400
              py-2 px-4 font-bold
              text-gray-100
              hover:bg-red-500 hover:text-gray-200
              focus:outline-none
              "
              onClick={handleDelete}
            >
              削除
            </button>
          </div>
        </div>
      </div>
    </AdminBasicModal>
  )
}

export default MenueDeleteModal
