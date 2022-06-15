import React from 'react'
import { useRouter } from 'next/router'
// NOTE: original
import { HomeLayout } from '../layout'
import { FormItem } from '../modules/orderPageParts'
// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import { selectStep, changeState } from '../../redux/features/step/stepSlice'

const OrderBase = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const registClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 1 }))
    router.push('/')
  }

  return (
    <HomeLayout title="情報入力">
      <FormItem />
    </HomeLayout>
  )
}

export default OrderBase
