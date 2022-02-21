import React from 'react'
import { useContext } from 'react'
import { useRouter } from 'next/router'

// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import { selectStep, changeState } from '../../redux/features/step/stepSlice'

// NOTE: original
import { HomeLayout } from '../layout'
import { ButtonCount, FormItem } from '../modules'

const MenueBase = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const registClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 3 }))
    router.push('/order')
  }

  const cartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 3 }))
    router.push('/cart')
  }

  return (
    <div>
      <HomeLayout title="商品一覧">
        menueBase
        <FormItem />
        <ButtonCount/>
        <button onClick={registClick}>注文確定</button>
        <button onClick={cartClick}>注文内容を確認する</button>
      </HomeLayout>
    </div>
  )
}

export default MenueBase
