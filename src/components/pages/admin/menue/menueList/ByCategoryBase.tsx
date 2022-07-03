import { useEffect, useRef } from 'react'
// Originals
import { AdminLayout } from '../../../../layout'
import { MenueSubmitModal } from '../../../../modules/modal/admin'
import { MenueDetailModal } from '../../../../modules/modal/admin'
import { MenueDeleteModal } from '../../../../modules/modal/admin'
import { Tabs } from '../../../../atoms'
import { SnackBar } from '../../../../atoms'
import { ByCategoryMenuView } from '../../../../modules/menue/menueList'
// Custom Hook
import { useFetchMenue } from '../../../../../hooks/menue/useFetchMenue'
import { useFetchByCategory } from '../../../../../hooks/menue/useFetchByCategory'
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
import { selectCategoryItems } from '../../../../../redux/features/menue/admin/category/categoryItemsSlice'
import { selectSnackBar } from '../../../../../redux/features/snackbar/snackbarSlice'

const ByCategoryBase = () => {
  const dispatch = useAppDispatch()
  const adminPageSelector = useAppSelector(selectAdminPage)
  const menueListSelector = useAppSelector(selectMenueList)
  const categoryItemsSelector = useAppSelector(selectCategoryItems)
  const snackBarSelector = useAppSelector(selectSnackBar)

  const { getMenueList } = useFetchMenue()
  const { getCategoryList } = useFetchByCategory()

  const didLogRef = useRef(false)

  useEffect(() => {
    // NOTE: React18の2回レンダリングの対処
    if (didLogRef.current === false) {
      didLogRef.current = true

      if (menueListSelector.length !== 0) dispatch(resetMenueForMenueList())
      getMenueList()
      getCategoryList()
    }
  }, [])

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
          <ul className="mt-4">
            {categoryItemsSelector.map((item, index) => (
              <li key={index} className="mt-10 first:mt-2">
                <h3 className="text-2xl">{item.categoryName}</h3>
                <div className="mb-2 mt-2 border-t-[1px] border-gray-400"></div>
                <ByCategoryMenuView targetCategory={item.categoryName} />
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

export default ByCategoryBase
