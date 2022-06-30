import React from 'react'
import { useRouter } from 'next/router'
// originals
import { BasicModal } from '../modal'
import { CartDetailView } from './modalView'
// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks'
import {
  selectMenuePage,
  changeState as changeStateForMenuePage,
} from '../../../redux/features/menuePageSlice'
import { selectStep, changeState } from '../../../redux/features/step/stepSlice'
import { selectCartDetail } from '../../../redux/features/cartdetailSlice'

const CartDetailModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const menuPageSelector = useAppSelector(selectMenuePage)
  const cartDetailSelector = useAppSelector(selectCartDetail)
  const router = useRouter()

  const modalClose = () => {
    dispatch(
      changeStateForMenuePage({ ...menuPageSelector, isOpenCartModal: false })
    )
  }
  const toClientPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 2 }))
    router.push('/client')
  }

  return (
    <BasicModal isOpenModal={menuPageSelector.isOpenCartModal}>
      <div className="relative flex items-center ">
        <div className="absolute right-0 p-2">
          <button
            type="button"
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="authentication-modal"
            onClick={modalClose}
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
      {/* 商品 */}
      <div className="z-10 flex max-h-[600px] overflow-auto">
        <CartDetailView />
      </div>
      {/* 合計金額ボタン */}
      <div
        className="
          z-20
          mt-4
          flex
          w-full
          justify-center
          "
      >
        <button
          className="
          focus:shadow-outline
          mx-auto mb-2
          min-w-[300px] rounded-full
          border-2
          border-black
          bg-gray-400
          py-2 px-4 font-bold
          text-gray-100
          hover:text-gray-300
          focus:outline-none
          "
          onClick={toClientPage}
        >
          {/* //NOTE:消費税追加 */}
          {/* お会計に進む : ￥{Math.floor(cartDetailSelector.totalPlice * 1.1).toLocaleString()} */}
          お会計に進む : ￥
          {Math.floor(cartDetailSelector.totalPlice * 1.1).toLocaleString()}
        </button>
      </div>
    </BasicModal>
  )
}
export default CartDetailModal
