import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
//NOTE:Redux関連
import { useAppDispatch } from '../../redux/app/hooks'
// Custom Hook
import { useResetAllState } from '../../hooks/useResetAllState'

const ThanksPageBase = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { resetAllState } = useResetAllState()

  useEffect(() => {
    resetAllState()
  }, [])

  const toHomePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    router.push('/')
  }

  return (
    <div>
      <button
        className="
            focus:shadow-outline
            w-4/12
            min-w-[150px] rounded
            bg-blue-400
            py-2 px-4 font-bold
            text-white
            hover:bg-blue-500
            focus:outline-none
            disabled:bg-gray-300 disabled:text-gray-400
            "
        type="button"
        onClick={toHomePage}
      >
        注文登録へ戻る
      </button>
    </div>
  )
}

export default ThanksPageBase
