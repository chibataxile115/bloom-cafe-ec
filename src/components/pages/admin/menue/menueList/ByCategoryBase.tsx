import { useEffect } from 'react'
// Originals
import { AdminLayout } from '../../../../layout'
import { MenueSubmitModal } from '../../../../modules/modal'
import { Tabs } from '../../../../atoms'
import { ByCategoryMenueView } from '../../../../modules/menue/menueList'
// Custom Hook
import { useFetchByCategory } from '../../../../../hooks/menue/useFetchByCategory'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../../../../redux/app/hooks'
import {
  selectAdminPage,
  changeState as changeStateForAdminPage,
} from '../../../../../redux/features/adminPageSlice'
import { selectCategoryItems } from '../../../../../redux/features/menue/category/categoryItemsSlice'

const ByCategoryBase = () => {
  const dispatch = useAppDispatch()
  const adminPageSelector = useAppSelector(selectAdminPage)
  const categoryItemsSelector = useAppSelector(selectCategoryItems)

  const { getCategoryList } = useFetchByCategory()

  useEffect(() => {
    getCategoryList()
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
                <ByCategoryMenueView targetCategory={item.categoryName} />
              </li>
            ))}
          </ul>
        </Tabs>
      </div>
      <MenueSubmitModal />
    </AdminLayout>
  )
}

export default ByCategoryBase
