import { useEffect } from 'react'
import Image from 'next/image'
// types
import { AdminMenueDetail } from '../../../../../types/types'
// Originals
import { AdminLayout } from '../../../../layout'
import { MenueSubmitModal } from '../../../../modules/modal/admin'
import { MenueDetailModal } from '../../../../modules/modal/admin'
import { MenueDeleteModal } from '../../../../modules/modal/admin'
import { Tabs } from '../../../../atoms'
import { ImageLoader } from '../../../../../lib'
import { SnackBar } from '../../../../atoms'
// Custom Hook
import { useFetchMenue } from '../../../../../hooks/menue/useFetchMenue'
import { useFetchSubImages } from '../../../../../hooks/menue/useFetchSubImages'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../../../../redux/app/hooks'
import {
  selectAdminPage,
  changeState as changeStateForAdminPage,
} from '../../../../../redux/features/adminPageSlice'
import {
  selectMenueList,
  resetMenue as resetMenueForMenueList,
} from '../../../../../redux/features/menue/menueListSlice'
import {
  selectAdminMenueDetail,
  changeState as changeStateForAdminMenueDetailModal,
} from '../../../../../redux/features/menue/admin/adminMenueDetailSlice'
import { resetImages } from '../../../../../redux/features/menue/subImagesSlice'
import { selectSnackBar } from '../../../../../redux/features/snackbar/snackbarSlice'

const AllMenueBase = () => {
  const dispatch = useAppDispatch()
  const adminPageSelector = useAppSelector(selectAdminPage)
  const menueListSelector = useAppSelector(selectMenueList)
  const adminMenueDetailSelector = useAppSelector(selectAdminMenueDetail)
  const snackBarSelector = useAppSelector(selectSnackBar)

  const { getMenueList } = useFetchMenue()
  const { getSubImages } = useFetchSubImages()

  useEffect(() => {
    if (menueListSelector.length !== 0) {
      dispatch(resetMenueForMenueList())
      getMenueList()
    } else {
      getMenueList()
    }
  }, [])

  const openDetails = (menueDetailData: AdminMenueDetail) => {
    const { docID, id, name, category, count, imageURL, plice } =
      menueDetailData

    dispatch(resetImages())

    dispatch(
      changeStateForAdminMenueDetailModal({
        ...adminMenueDetailSelector,
        docID: docID,
        id: id,
        name: name,
        category: category,
        count: count,
        imageURL: imageURL,
        plice: plice,
      })
    )
    getSubImages(docID)
    dispatch(
      changeStateForAdminPage({
        ...adminPageSelector,
        isMenueDetailModal: true,
      })
    )
  }

  return (
    <AdminLayout tabTitle="商品一覧" pageTitle="商品一覧">
      <button
        className="
        maw-h-[50px] max-w-[100px]
        rounded-md border-2
        border-blue-600 bg-blue-500
        px-2 py-2
        text-white
        focus:ring-2
        focus:ring-gray-700
        "
        onClick={() => {
          dispatch(
            changeStateForAdminPage({
              ...adminPageSelector,
              isMenueSubmitModal: true,
            })
          )
        }}
      >
        商品を登録
      </button>
      <div className="mt-5">
        <Tabs currentTabTitle={'すべて'}>
          <ul className="flex flex-wrap">
            {menueListSelector.map((item) => (
              <li
                key={item.id}
                onClick={() =>
                  openDetails({
                    docID: item.docID,
                    id: item.id,
                    name: item.name,
                    category: item.category,
                    count: item.count,
                    imageURL: item.imageURL,
                    plice: item.plice,
                  })
                }
              >
                <div
                  className="
                  mt-4 mr-4 flex
                  flex-col
                  rounded-md
                  bg-white py-2 px-2
                  shadow-xl
                  "
                >
                  <div
                    className="
                    next-image-div m-0
                    h-full w-full rounded-md
                    border-[1px]
                    border-gray-400
                    p-0
                    "
                  >
                    <Image
                      loader={() => ImageLoader()}
                      src={ImageLoader(item.imageURL, 190)}
                      width={190}
                      height={190}
                      className="m-0 items-center justify-center rounded-md p-0"
                      unoptimized
                    />
                  </div>
                  <div
                    className="
                    mt-2 flex flex-col
                    border-l-4 border-blue-500
                    "
                  >
                    <p className="ml-2">{item.name}</p>
                    <p className="ml-2">{`${Math.round(
                      Number(item.plice) * 1.1
                    )}円 (税抜 : ${item.plice}円)`}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Tabs>
      </div>
      <MenueSubmitModal />
      <MenueDetailModal />
      <MenueDeleteModal />

      {/* メニュー削除用スナックバー */}
      <SnackBar
        message={
          snackBarSelector.mode === 'success'
            ? '削除が完了しました！'
            : '削除に失敗しました。もう一度お試し下さい。'
        }
        isOpen={snackBarSelector.isOpenTheMenueDeleteSnackbar}
        mode={snackBarSelector.mode}
      />
    </AdminLayout>
  )
}

export default AllMenueBase
