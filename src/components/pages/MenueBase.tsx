import React from 'react'
import { useContext } from 'react'
import { useRouter } from 'next/router'
// NOTE: Custom Hook
import { useFetchMenue } from '../../hooks/menue/useFetchMenue'

// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import { selectStep, changeState } from '../../redux/features/step/stepSlice'
import {
  selectMenueList,
  addMenue,
} from '../../redux/features/menue/menueListSlice'

// NOTE: original
import { HomeLayout } from '../layout'
import { MenueCard } from '../modules'

const MenueBase = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const menueListSelector = useAppSelector(selectMenueList)

  useFetchMenue()

  const registClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 3 }))
    router.push('/form')
  }

  const cartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 3 }))
    router.push('/cart')
  }

  return (
    <div>
      <HomeLayout title="商品一覧">
        <div className="flex">
          <MenueCard />
        </div>
        <button onClick={cartClick}>注文内容を確認する</button>
      </HomeLayout>
    </div>
  )
}

export default MenueBase
