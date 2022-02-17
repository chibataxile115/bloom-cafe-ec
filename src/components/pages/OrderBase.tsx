import React from 'react'
import { useRouter } from 'next/router'
// NOTE: original
import { HomeLayout } from '../layout'
// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import {
  selectStep,
  resetState,
  changeState,
} from '../../redux/features/step/stepSlice'

const OrderBase = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const registClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 1 }))
    router.push('/')
  }

  return (
    <HomeLayout title="注文確認">
      <button onClick={registClick}>もう一度</button>
      <button>注文確定</button>
    </HomeLayout>
  )
}

export default OrderBase
