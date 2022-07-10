import Image from 'next/image'
import clsx from 'clsx'
// Originals
import { AdminBasicModal } from '../'
import { ImageLoader } from '../../../../lib'
import { Spinner, SnackBar } from '../../../atoms'
// Custom Hook
import { useUpdateMenu } from '../../../../hooks/menue/useUpdateMenu'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../../../redux/app/hooks'
import {
  selectAdminPage,
  changeState as changeStateForAdminPage,
} from '../../../../redux/features/adminPageSlice'
import { selectSubImages } from '../../../../redux/features/menue/subImagesSlice'
import {
  selectAdminMenueDetail,
  changeState as changeStateForAdminMenuDetail,
} from '../../../../redux/features/menue/admin/adminMenuDetailSlice'
import { resetImages } from '../../../../redux/features/menue/subImagesSlice'
import { selectSnackBar } from '../../../../redux/features/snackbar/snackbarSlice'
import React from 'react'

const MenueDetailModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const adminPageSelector = useAppSelector(selectAdminPage)
  const adminMenueDetailSelector = useAppSelector(selectAdminMenueDetail)
  const subImagesSelector = useAppSelector(selectSubImages)
  const snackBarSelector = useAppSelector(selectSnackBar)

  const { updateMenu } = useUpdateMenu()

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

  const handleUpdateMenu = () => {
    updateMenu({
      docID: adminMenueDetailSelector.docID,
      imageURL: adminMenueDetailSelector.imageURL,
      plice: adminMenueDetailSelector.plice,
      name: adminMenueDetailSelector.name,
      category: adminMenueDetailSelector.category,
      description: adminMenueDetailSelector.description,
    })
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
        <table
          className="
          mt-4
          flex flex-col
          py-2 px-2
          "
        >
          {/* 商品名 */}
          <tbody>
            <tr className="mt-5 flex flex-col">
              <th>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="detail-name"
                    className="text-lg text-gray-700"
                  >
                    商品名
                    {adminMenueDetailSelector.isNameEdit && '(編集モード)'}
                  </label>
                  <button
                    className={clsx(
                      `
                      items-center
                      rounded
                      border-2 border-gray-400
                      p-1
                      shadow
                      hover:border-gray-700
                      hover:shadow-lg
                      `,
                      adminMenueDetailSelector.isNameEdit
                        ? `bg-green-300 hover:bg-green-400`
                        : `bg-blue-300 hover:bg-blue-400`
                    )}
                    onClick={() =>
                      dispatch(
                        changeStateForAdminMenuDetail({
                          ...adminMenueDetailSelector,
                          isNameEdit: !adminMenueDetailSelector.isNameEdit,
                        })
                      )
                    }
                  >
                    {adminMenueDetailSelector.isNameEdit ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-green-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                          />
                        </svg>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </th>
              <td className="mt-2">
                <input
                  className={clsx(
                    `
                    focus:shadow-outline
                    w-full appearance-none rounded
                    border  py-2
                    px-3
                    leading-tight
                    text-gray-700
                    `,
                    adminMenueDetailSelector.isNameEdit
                      ? `bg-white shadow`
                      : `border-transparent bg-gray-200 shadow-transparent`
                  )}
                  id="detail-name"
                  type="text"
                  disabled={!adminMenueDetailSelector.isNameEdit}
                  value={adminMenueDetailSelector.name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch(
                      changeStateForAdminMenuDetail({
                        ...adminMenueDetailSelector,
                        name: event.target.value,
                      })
                    )
                  }}
                />
              </td>
            </tr>
          </tbody>

          {/* 金額 */}
          <tbody>
            <tr className="mt-5 flex flex-col">
              <th className="flex items-center justify-between">
                <label htmlFor="detail-plice" className="text-lg text-gray-700">
                  金額
                  {adminMenueDetailSelector.isPliceEdit && '(編集モード)'}
                </label>
                <button
                  className={clsx(
                    `
                      items-center
                      rounded
                      border-2 border-gray-400
                      p-1
                      shadow
                      hover:border-gray-700
                      hover:shadow-lg
                      `,
                    adminMenueDetailSelector.isPliceEdit
                      ? `bg-green-300 hover:bg-green-400`
                      : `bg-blue-300 hover:bg-blue-400`
                  )}
                  onClick={() =>
                    dispatch(
                      changeStateForAdminMenuDetail({
                        ...adminMenueDetailSelector,
                        isPliceEdit: !adminMenueDetailSelector.isPliceEdit,
                      })
                    )
                  }
                >
                  {adminMenueDetailSelector.isPliceEdit ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </>
                  )}
                </button>
                {/* </div> */}
              </th>
              <td className="mt-2">
                <input
                  className={clsx(
                    `
                    focus:shadow-outline
                    w-full appearance-none rounded
                    border  py-2
                    px-3
                    leading-tight
                    text-gray-700
                    `,
                    adminMenueDetailSelector.isPliceEdit
                      ? `bg-white shadow`
                      : `border-transparent bg-gray-200 shadow-transparent`
                  )}
                  id="detail-plice"
                  type="text"
                  disabled={!adminMenueDetailSelector.isPliceEdit}
                  value={adminMenueDetailSelector.plice}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch(
                      changeStateForAdminMenuDetail({
                        ...adminMenueDetailSelector,
                        plice: Number(event.target.value),
                      })
                    )
                  }}
                />
              </td>
            </tr>
          </tbody>

          {/* 画像 */}
          <tbody>
            <tr className="mt-5 flex flex-col">
              <th className="flex justify-start">
                <label htmlFor="detail-images">画像</label>
              </th>
              <td className="flex">
                {subImagesSelector.map((item) => (
                  <div
                    key={item.docID}
                    className="
                    next-image-div
                    end:mr-0
                    mt-2 mr-2
                    flex
                    list-none rounded-md
                    border-[1px] border-gray-400
                    "
                  >
                    <Image
                      loader={() => ImageLoader()}
                      src={ImageLoader(item.imageURL, imageSize)}
                      width={imageSize}
                      height={imageSize}
                      className="
                      mt-2
                      items-center justify-center
                      rounded-md
                      border-[1px]
                      p-0"
                      unoptimized
                    />
                  </div>
                ))}
              </td>
            </tr>
          </tbody>

          {/* 説明文 */}
          <tbody>
            <tr className="mt-5 flex flex-col">
              <th>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="detail-description"
                    className="text-lg text-gray-700"
                  >
                    説明
                    {adminMenueDetailSelector.isDescriptionEdit &&
                      '(編集モード)'}
                  </label>
                  <button
                    className={clsx(
                      `
                        items-center
                        rounded
                        border-2 border-gray-400
                        p-1
                        shadow
                        hover:border-gray-700
                        hover:shadow-lg
                        `,
                      adminMenueDetailSelector.isDescriptionEdit
                        ? `bg-green-300 hover:bg-green-400`
                        : `bg-blue-300 hover:bg-blue-400`
                    )}
                    onClick={() =>
                      dispatch(
                        changeStateForAdminMenuDetail({
                          ...adminMenueDetailSelector,
                          isDescriptionEdit:
                            !adminMenueDetailSelector.isDescriptionEdit,
                        })
                      )
                    }
                  >
                    {adminMenueDetailSelector.isDescriptionEdit ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-green-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                          />
                        </svg>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </th>
              <td className="mt-2">
                <textarea
                  className={clsx(
                    `
                    focus:shadow-outline
                    w-full appearance-none rounded
                    border  py-2
                    px-3
                    leading-tight
                    text-gray-700
                    `,
                    adminMenueDetailSelector.isDescriptionEdit
                      ? `bg-white shadow`
                      : `border-transparent bg-gray-200 shadow-transparent`
                  )}
                  id="detail-description"
                  cols={35}
                  rows={5}
                  placeholder="商品の説明"
                  disabled={!adminMenueDetailSelector.isDescriptionEdit}
                  value={adminMenueDetailSelector.description}
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                    dispatch(
                      changeStateForAdminMenuDetail({
                        ...adminMenueDetailSelector,
                        description: event.target.value,
                      })
                    )
                  }}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 削除ボタン */}
      <div className="flex w-full justify-between">
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

        <button
          className="
            focus:shadow-outline
            mx-auto mt-32 mb-2
            min-w-[150px] rounded-md
            border-2
            border-green-500
            bg-white
            py-2 px-4 font-bold
            text-gray-400
            hover:bg-green-400
            hover:text-gray-100
            focus:outline-none
            "
          onClick={handleUpdateMenu}
        >
          保存
        </button>
      </div>

      {/* スナックバー */}
      <SnackBar
        message={
          snackBarSelector.mode === 'success'
            ? '保存完了しました！'
            : '保存に失敗しました。もう一度お試し下さい。'
        }
        isOpen={snackBarSelector.isOpenTheMenuUpdateSnackbar}
        mode={snackBarSelector.mode}
      />
    </AdminBasicModal>
  )
}

export default MenueDetailModal
