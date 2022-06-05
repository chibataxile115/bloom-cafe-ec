import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
// NOTE: Custom Hook
import { useFetchMenue } from '../../hooks/menue/useFetchMenue'

// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import { selectStep, changeState } from '../../redux/features/step/stepSlice'
import {
  selectMenueList,
  resetMenue as resetMenueForMenueList,
} from '../../redux/features/menue/menueListSlice'

// NOTE: original
import { HomeLayout } from '../layout'
import { MenueCard } from '../modules'
import { CartDetailModal } from '../modules/modal'

const MenueBase = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const menueListSelector = useAppSelector(selectMenueList)

  const { getMenueList } = useFetchMenue()

  const didLogRef = useRef(false)

  useEffect(() => {
    // NOTE: React18の2回レンダリングの対処
    if (didLogRef.current === false) {
      didLogRef.current = true

      if (menueListSelector.length !== 0) dispatch(resetMenueForMenueList())
      getMenueList()
    }
  }, [])

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

  const orderClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 3 }))
    router.push('/order')
  }

  return (
    <HomeLayout title="商品一覧">
      <div className="flex flex-row justify-center">
        <MenueCard />
      </div>
      <button onClick={orderClick}>注文確定へ進む</button>
      <CartDetailModal />
    </HomeLayout>
  )
}

export default MenueBase
