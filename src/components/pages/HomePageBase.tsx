import React, { FC } from 'react'
import { useRouter } from 'next/router'
// NOTE: original
import { HomeLayout } from '../../components/layout'
// NOTE: Redux関連
import { useAppDispatch } from '../../redux/app/hooks'
import { selectStep, changeState } from '../../redux/features/step/stepSlice'

const HomePageBase: FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const registClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 2 }))
    router.push('/menu')
  }

  return (
    <HomeLayout title="ようこそ">
      <p className="m-24"></p>
      <h1 className="font-cursive justify-center font-light text-black">
        <span className="block text-5xl">b l o o m</span>
      </h1>
      <div className="m-32 flex w-full justify-center">
        <button className="absolute  mt-44   px-5  py-5" onClick={registClick}>
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
      </div>
    </HomeLayout>
  )
}

export default HomePageBase
