import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import { BaseModal } from '.'
import { ImageCartModal } from '.'

// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks'
import {
  selectStoringData,
  addOrder,
  incrementOrder,
  decrementOrder,
} from '../../../redux/features/storingdateSlice'
import {
  selectMenueList,
  updatedMenue,
} from '../../../redux/features/menue/menueListSlice'
// FIXME: 後で消す
import {
  selectStep,
  changeState as stepChangeState,
} from '../../../redux/features/step/stepSlice'

const CartDetailModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const storingDataSelector = useAppSelector(selectStoringData)
  const stepSelector = useAppSelector(selectStep)

  const modalClose = () => {
    dispatch(stepChangeState({ ...stepSelector, isCartModal: false }))
  }

  return (
    <BaseModal isOpenModal={stepSelector.isCartModal} count={0}>
      <div className="relative flex items-center justify-center">
        <h1 className="items-center justify-center text-center text-2xl font-bold">
          カート
        </h1>

        {/* Modal content */}

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
      <div className="flex flex-col p-10">
        {storingDataSelector.map((item, index) => (
          <div key={index}>
            <p>{`${item.id} : `}</p>
            <p>{`値段:${item.plice} 円 `}</p>
            <p>{item.name}</p>
            <ImageCartModal imagePath={item.imageURL} />
          </div>
        ))}
        <div></div>
      </div>
    </BaseModal>
  )
}
export default CartDetailModal
