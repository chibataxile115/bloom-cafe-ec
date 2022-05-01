import { useEffect } from 'react'
// Originals
import { AdminLayout } from '../../../../layout'
import { MenueSubmitModal } from '../../../../modules/modal'
import { Tabs } from '../../../../atoms'
// Custom Hook
import { useFetchMenue } from '../../../../../hooks/menue/useFetchMenue'
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

const ByCategoryBase = () => {
  const dispatch = useAppDispatch()
  const adminPageSelector = useAppSelector(selectAdminPage)
  const menueListSelector = useAppSelector(selectMenueList)

  const { getMenueList } = useFetchMenue()

  // useEffect(() => {
  //   if (menueListSelector.length !== 0) {
  //     dispatch(resetMenueForMenueList())
  //     getMenueList()
  //   } else {
  //     getMenueList()
  //   }
  // }, [])

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
        <Tabs currentTabTitle={'カテゴリー順'}>
          <p>カテゴリー別</p>
        </Tabs>
      </div>
      <MenueSubmitModal />
    </AdminLayout>
  )
}

export default ByCategoryBase
