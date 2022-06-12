import Image from 'next/image'
// Originals
import { AdminBasicModal } from '../'
import { ImageLoader } from '../../../../lib'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../../../redux/app/hooks'
import {
  selectAdminPage,
  changeState as changeStateForAdminPage,
} from '../../../../redux/features/adminPageSlice'
import { selectSubImages } from '../../../../redux/features/menue/subImagesSlice'
import { selectAdminMenueDetail } from '../../../../redux/features/menue/admin/adminMenueDetailSlice'
import { resetImages } from '../../../../redux/features/menue/subImagesSlice'

const MenueDetailModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const adminPageSelector = useAppSelector(selectAdminPage)
  const adminMenueDetailSelector = useAppSelector(selectAdminMenueDetail)
  const subImagesSelector = useAppSelector(selectSubImages)

  const imageSize: number = 100

  const handleModalClose = () => {
    dispatch(
      changeStateForAdminPage({
        ...adminPageSelector,
        isMenueDetailModal: false,
      })
    )
    dispatch(resetImages())
  }

  return (
    <AdminBasicModal isOpenModal={adminPageSelector.isMenueDetailModal}>
      <div className="flex flex-col justify-center">
        {/* ヘッダー */}
        <div className="relative flex items-center justify-center">
          <h1 className="items-center justify-center text-center text-2xl font-bold">
            商品の詳細
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
        <div
          className="
          mt-4 mr-4 flex
          flex-col
          rounded-md
          bg-white py-2 px-2
          "
        >
          {/* 商品名 */}
          <div
            className="
            mb-5 flex
            flex-row
            "
          >
            <div className="w-[60px] min-w-[60px]">
              <h3>商品名</h3>
            </div>
            <div className="mx-2">:</div>
            <div className="ml-0 text-2xl">
              <h3>{adminMenueDetailSelector.name}</h3>
            </div>
          </div>

          {/* 画像 */}
          <div
            className="
            mb-5 flex
            flex-row
            "
          >
            <div className="w-[60px] min-w-[60px]">
              <h3>画像</h3>
            </div>
            <div className="mx-2">:</div>
            <div
              className="
              flex min-w-[300px]
              max-w-[400px]
              flex-row
              overscroll-x-none
              "
            >
              {/* <ul> */}
              {subImagesSelector.map((item) => (
                <li
                  key={item.docID}
                  className="end:mr-0 mr-2 list-none
                    "
                >
                  <div
                    className="
                      next-image-div
                      m-0 h-full
                      w-full
                      rounded-md
                      border-[1px]
                      border-gray-400
                      p-0
                      "
                  >
                    <Image
                      loader={() => ImageLoader()}
                      src={ImageLoader(item.imageURL, imageSize)}
                      width={imageSize}
                      height={imageSize}
                      className="m-0 items-center justify-center rounded-md p-0"
                      unoptimized
                    />
                  </div>
                </li>
              ))}
              {/* </ul> */}
            </div>
          </div>

          {/* 説明文 */}
          <div
            className="
            mb-5 flex
            flex-row
            "
          >
            <div className="w-[60px] min-w-[60px]">
              <h3>説明文</h3>
            </div>
            <div className="mx-2">:</div>
            <div>
              <textarea
                className="
                form-control
                m-0
                block
                w-full
                rounded
                border
                border-solid
                border-gray-300
                bg-white bg-clip-padding
                px-3 py-1.5 text-base
                font-normal
                text-gray-700
                transition
                ease-in-out
                focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none
                "
                id="exampleFormControlTextarea1"
                cols={35}
                rows={5}
                placeholder="商品の説明"
              ></textarea>
            </div>
          </div>
        </div>

        {/* 削除ボタン */}
        <div className="flex w-full">
          <button
            className="
            focus:shadow-outline
            mx-auto mt-32 mb-2
            min-w-[150px] rounded-md
            border-2
            border-red-500
            bg-white
            py-2 px-4 font-bold
            text-gray-400
            hover:bg-red-400
            hover:text-gray-100
            focus:outline-none
            "
            onClick={() =>
              dispatch(
                changeStateForAdminPage({
                  ...adminPageSelector,
                  isMenueDeleteModal: true,
                })
              )
            }
          >
            この商品を削除
          </button>
        </div>
      </div>
    </AdminBasicModal>
  )
}

export default MenueDetailModal
