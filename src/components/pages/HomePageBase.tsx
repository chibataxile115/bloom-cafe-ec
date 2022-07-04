import React, { FC } from 'react'
import { useRouter } from 'next/router'
// NOTE: original
import { HomeLayout } from '../../components/layout'
import { ArrowButton } from '../atoms/button'
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
      <p className="m-14"></p>
      <h1 className="mt-18 font-cursive items-center justify-center font-light text-black">
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
          className="rounded-full bg-white p-2 shadow-lg outline-black"
          onClick={registClick}
        >
          <ArrowButton ClassName="h-12 w-12 outline-black" direction="right" />
        </button>
      </div>
    </HomeLayout>
  )
}

export default HomePageBase
