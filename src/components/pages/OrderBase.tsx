import React from 'react'
import { useRouter } from 'next/router'
// NOTE: original
import { HomeLayout } from '../layout'
import { OrderMenueView } from '../modules/orderPageParts'
// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import { selectStep, changeState } from '../../redux/features/step/stepSlice'

const OrderBase = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const registClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 3 }))
    router.push('/')
  }

  return (
    <HomeLayout title="注文確認">
      <OrderMenueView />
    </HomeLayout>
  )
}

export default OrderBase
