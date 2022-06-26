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
    dispatch(changeState({ ...selectStep, stepIndex: 3 }))
    router.push('/client')
  }

  return (
    <HomeLayout title="商品一覧">
      <div className="flex flex-row justify-center">
        <MenuCard />
      </div>
      <button
        className=" absolute bottom-[70px]  px-5 py-1 "
        onClick={clientClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <CartDetailModal />
    </HomeLayout>
  )
}

export default MenuBase
