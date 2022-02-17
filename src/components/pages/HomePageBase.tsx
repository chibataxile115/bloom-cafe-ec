import React, { FC, useState } from 'react'
import { useRouter } from 'next/router'

// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import {
  selectMenueItems,
  menueAdd,
} from '../../redux/features/menue/menueItemsSlice'

import {
  selectStep,
  resetState,
  changeState,
} from '../../redux/features/step/stepSlice'

const HomePageBase: FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const registClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 2 }))
    router.push('/check-page')
  }

  // FIXME: Selectorの呼び出しを修正する
  return (
    <>
      <div className="mt-5 flex w-full justify-center">
        <button
          className="hover:bg-wihte my-3 mx-3 w-8/12 rounded py-2 px-3 text-base text-black
        disabled:opacity-40"
          onClick={registClick}
        >
          注文を登録へすすむ
        </button>
      </div>
      <div>
        {/* <img src="/bloomwhite.jpg" width="500" height="auto" ></img> */}
        <></>
        <p className=" h-0 "></p>
        <p className=" h-10 bg-white text-xs">
          ・お弁当予約に関しては前日の９時半までのご連絡でお願いいたします。　　　　　　※水・日はお弁当お休みとなります。
        </p>
        <p className=" h-10 bg-white text-xs">
          ・お弁当配達に関してましては、「配達距離」「注文金額」によりご対応できない場合がございますのでご了承ください。
        </p>
        <p className="bg-white text-xs">
          ・お問合せに関しては、注文ページ「備考」にて承ります。
        </p>
      </div>
    </>
  )
}

export default HomePageBase
