import { useEffect, useRef, useContext } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
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
import {
  selectMenuePage,
  changeState as changeStateForMenuePage,
} from '../../redux/features/menuePageSlice'
import { selectCartDetail } from '../../redux/features/cartdetailSlice'
// NOTE: original
import { ArrowButton } from '../atoms/button'
import { HomeLayout } from '../layout'
import { MenuCard } from '../modules'
import { CartDetailModal } from '../modules/modal'

const MenuBase = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const menueListSelector = useAppSelector(selectMenueList)
  const userSelector = useAppSelector(selectUser)
  const menuPageSelector = useAppSelector(selectMenuePage)
  const cartDetailSelector = useAppSelector(selectCartDetail)

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

  const openModal = () => {
    dispatch(
      changeStateForMenuePage({ ...menuPageSelector, isOpenCartModal: true })
    )
  }

  const didLogRef = useRef(false)

  useEffect(() => {
    getLiff()

    // NOTE: React18の2回レンダリングの対処
    if (didLogRef.current === false) {
      didLogRef.current = true

      // FIXME: 新情報と旧情報を比較して動的に、最新の値で更新するようにする。
      // if (menueListSelector.length !== 0) dispatch(resetMenueForMenueList())
      if (menueListSelector.length === 0) getMenueList()
    }
  }, [])

  const clientClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 3 }))
    router.push('/client')
  }

  return (
    <HomeLayout title="商品選択">
      <MenuCard />
      <div className="sticky bottom-0 ml-auto mr-4 flex justify-end">
        <div
          className="
          sticky
          flex flex-row
          p-2
          "
        >
          <button
            className="rounded-full border-2 border-black bg-white p-2 shadow-xl"
            onClick={clientClick}
          >
            <ArrowButton ClassName="h-12 w-12" direction="right" />
          </button>
        </div>
        {/* カートアイコン */}
        <div
          className="
          sticky
          bottom-10
          flex flex-row
          p-2
          "
        >
          <button
            className="
            relative
            rounded-full
            border-2 border-black
            bg-white p-2 shadow-xl
            "
            onClick={openModal}
          >
            {/* アイコン */}
            <span className="top-0 left-0 z-10 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </span>
            {/* カート内の数 */}
            <p
              className={clsx(
                `
              absolute top-[-15px] right-0
              z-20 flex h-9
              w-9
              items-center
              justify-center
              rounded-full border-2 border-black bg-gray-400
              text-white
              shadow-xl
              `,
                !cartDetailSelector.totalCount && 'hidden'
              )}
            >
              {cartDetailSelector.totalCount}
            </p>
          </button>
        </div>
      </div>
      <CartDetailModal />
    </HomeLayout>
  )
}

export default MenuBase
