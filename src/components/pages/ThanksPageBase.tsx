import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
//NOTE:Redux関連
import { selectStep, changeState } from '../../redux/features/step/stepSlice'
import { useAppDispatch } from '../../redux/app/hooks'
// Custom Hook
import { useResetAllState } from '../../hooks/useResetAllState'
import { useLiff, LiffContext } from '../../hooks/liff/useLiffProvider'

//Originals
import { ThanksLayout } from '../layout'

const ThanksPageBase: React.FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { resetAllState } = useResetAllState()
  const { loggedIn, isInClient, login, closeWindow } = useLiff()
  const liff = useContext(LiffContext)

  const closeLiff = async () => {
    if (!liff.isInClient()) {
    } else {
      liff.closeWindow()
    }
  }

  useEffect(() => {
    resetAllState()
  }, [])

  const toHomePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 1 }))
    router.push('/')
  }

  return (
    <ThanksLayout>
      <div className=" mb-auto mt-24">
        <h1 className="font-cursive flex  w-full border-b-2 border-black pb-6 text-2xl font-light text-black">
          ご注文ありがとうございました
        </h1>
        <p className="flex items-center justify-center pt-6">
          メッセージは送信されました
        </p>
      </div>

      <div className="mt-auto mb-24  flex justify-center">
        <button
          className="
            al-auto
            mr-2
            rounded-md
            border
            border-black
            bg-white py-2 px-4
            font-bold
            text-black
            focus:outline-none
            "
          type="button"
          onClick={toHomePage}
        >
          トップページへ戻る
        </button>
        <button
          className="
            al-auto
            ml-2
            rounded-md
            bg-black
            py-2 px-4 font-bold
            text-white
            focus:outline-none
            "
          type="button"
          onClick={closeLiff}
        >
          アプリを終了する
        </button>
      </div>
    </ThanksLayout>
  )
}

export default ThanksPageBase
