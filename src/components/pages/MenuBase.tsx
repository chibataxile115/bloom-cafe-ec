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
import { MenuCard } from '../modules'
import { CartDetailModal } from '../modules/modal'

const MenuBase = () => {
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

  const clientClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 2 }))
    router.push('/client')
  }
  const topPageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 2 }))
    router.push('/')
  }

  return (
    <HomeLayout title="商品一覧">
      <div className="flex flex-row justify-center">
        <MenuCard />
      </div>
      <button onClick={clientClick}>お客様情報へ進む</button>
      <button onClick={topPageClick}>トップページに戻る</button>
      <CartDetailModal />
    </HomeLayout>
  )
}

export default MenuBase
