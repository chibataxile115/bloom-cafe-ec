import React from 'react'
import { useRouter } from 'next/router'
// NOTE: original
import { HomeLayout } from '../layout'
import { FormItem } from '../modules/orderPageParts'
// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import { selectStep, changeState } from '../../redux/features/step/stepSlice'

const ClientBase = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const orderClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 4 }))
    router.push('/order')
  }

  return (
    <HomeLayout title="情報入力">
      <FormItem />
      <button onClick={orderClick}>お客様情報へ進む</button>
    </HomeLayout>
  )
}

export default ClientBase
