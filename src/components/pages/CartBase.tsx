import React from 'react'
import { useRouter } from 'next/router'
// NOTE: original
import { CartLayout } from '../layout'
import { CartCard } from '../modules'

// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import { selectStep, changeState } from '../../redux/features/step/stepSlice'


const CartBase = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const registClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 1 }))
    router.push('/menue')
  }

  return (
    <div>
      <CartLayout title="カート">
        <CartCard/>
        <button onClick={registClick}>注文選択へ戻る</button>
      </CartLayout>
    </div>
  )
}

export default CartBase
