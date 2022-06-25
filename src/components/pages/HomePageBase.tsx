import React, { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
// NOTE: original
import { HomeLayout } from '../../components/layout'
import { ImageLoader } from '../../lib'
// NOTE: Redux関連
import { useAppDispatch } from '../../redux/app/hooks'
import { selectStep, changeState } from '../../redux/features/step/stepSlice'

const HomePageBase: FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const registClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 1 }))
    router.push('/menu')
  }

  return (
    <HomeLayout title="ようこそ">
      <p className="m-24"></p>
      <h1 className="font-cursive items-center justify-center font-light text-black">
        <span className="block text-5xl">b l o o m</span>
      </h1>
      <div
        className="
        mt-auto mb-10
        flex w-full
        justify-center
        bg-gray-200
        "
      >
        <button
          className="rounded-full bg-white p-2 shadow-lg"
          onClick={registClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>
    </HomeLayout>
  )
}

export default HomePageBase
