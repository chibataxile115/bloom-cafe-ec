// Originals
import { AdminLayout } from '../../../layout'
import { MenueSubmitModal } from '../../../modules/modal'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../../../redux/app/hooks'
import {
  selectAdminPage,
  changeState as changeStateForAdminPage,
} from '../../../../redux/features/adminPageSlice'

const MenueListBase: React.FC = () => {
  const dispatch = useAppDispatch()
  const adminPageSelector = useAppSelector(selectAdminPage)

  return (
    <AdminLayout tabTitle="商品一覧" pageTitle="商品一覧">
      <button
        className="border-4 border-blue-800 bg-blue-600 px-5 py-5 text-white"
        onClick={() => {
          dispatch(
            changeStateForAdminPage({
              ...adminPageSelector,
              isMenueSubmitModal: true,
            })
          )
        }}
      >
        モーダルON
      </button>
      <MenueSubmitModal />
    </AdminLayout>
  )
}

export default MenueListBase
