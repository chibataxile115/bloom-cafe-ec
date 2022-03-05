import React from 'react'
import { useRouter } from 'next/router'
// NOTE: original
import { FormItem } from '../modules'
import { HomeLayout } from '../layout'

// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import {
  selectStep,
  changeState,
} from '../../redux/features/step/stepSlice'

const InputFormBase = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const registClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 1 }))
    router.push('/order')
  }

  return (
    <div>
      < HomeLayout title="入力フォーム">
        <FormItem/>
        <button onClick={registClick}>注文確定</button>
      </HomeLayout>
    </div>
  )
}

export default InputFormBase

