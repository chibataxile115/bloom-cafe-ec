import React, { useState, useEffect } from 'react'
// originals
import { BasicModal, ImageCartModal } from '../modal'
import { CartDetailView } from './modalView'
// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks'
import {
  selectMenuePage,
  changeState as changeStateForMenuePage,
} from '../../../redux/features/menuePageSlice'

const CartDetailModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const menuPageSelector = useAppSelector(selectMenuePage)
  const modalClose = () => {
    dispatch(
      changeStateForMenuePage({ ...menuPageSelector, isOpenCartModal: false })
    )
  }

  return (
    <BasicModal isOpenModal={menuPageSelector.isOpenCartModal}>
      <div className="relative flex items-center justify-center">
        <h1 className="items-center justify-center text-center text-2xl font-bold">
          カート
        </h1>

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
      <CartDetailView />
    </BasicModal>
  )
}
export default CartDetailModal
