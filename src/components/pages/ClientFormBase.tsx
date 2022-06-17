import React from 'react'
import { useRouter } from 'next/router'
// NOTE: original
import { FormItem } from '../modules/clientPageParts'
import { HomeLayout } from '../layout'

// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import { selectStep, changeState } from '../../redux/features/step/stepSlice'

const ClientFormBase = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const registClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 3 }))
    router.push('/order')
  }

  return (
    <div>
      <HomeLayout title="情報入力">
        <FormItem />
      </HomeLayout>
    </div>
  )
}

export default ClientFormBase
