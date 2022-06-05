import { useEffect, useRef, useContext } from 'react'
import { useRouter } from 'next/router'
// NOTE: Custom Hook
import { useFetchMenue } from '../../hooks/menue/useFetchMenue'
import { useLiff, LiffContext } from '../../hooks/liff/useLiffProvider'
// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import { selectStep, changeState } from '../../redux/features/step/stepSlice'
import {
  selectMenueList,
  resetMenue as resetMenueForMenueList,
} from '../../redux/features/menue/menueListSlice'
import { selectUser, updateUserProf } from '../../redux/features/userSlice'

// NOTE: original
import { HomeLayout } from '../layout'
import { MenueCard } from '../modules'
import { CartDetailModal } from '../modules/modal'

const MenueBase = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const menueListSelector = useAppSelector(selectMenueList)
  const userSelector = useAppSelector(selectUser)

  const { loggedIn, isInClient, login } = useLiff()
  const liff = useContext(LiffContext)

  const { getMenueList } = useFetchMenue()

  const getLiff = async () => {
    if (!loggedIn) {
      login
    }
    if (isInClient) {
      liff.getProfile().then(async (profile) => {
        dispatch(
          updateUserProf({
            ...userSelector,
            liffID: profile.userId,
            userName: profile.displayName,
          })
        )
      })
    }
  }

  const didLogRef = useRef(false)

  useEffect(() => {
    getLiff()

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
