import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import {
  selectMenueItems,
  menueAdd,
} from '../../redux/features/menue/menueItemsSlice'
// NOTE: React Icons
import { FiAlertCircle } from 'react-icons/fi'
// NOTE: Custom Hook
import { useFetchMenue } from '../../hooks/menue/useFetchMenue'

import { selectStep, changeState } from '../../redux/features/step/stepSlice'

const HomePageBase: FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  useFetchMenue()

  const registClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 2 }))
    router.push('/menue')
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
      <div className="mt-2 flex flex-col justify-center">
        <img src="/bloomwhite.jpg" width="500" height="auto"></img>
      </div>
      <div className="mt-2 bg-white p-2 text-sm">
        <ul className="list-none">
          <div className="flex flex-row">
            <li className="mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <div className="flex flex-col">
              <li>
                お弁当予約に関しては前日の９時半までのご連絡でお願いいたします。
              </li>
              <li>※水・日はお弁当お休みとなります。</li>
            </div>
          </div>
          <div className="flex flex-row">
            <li className="mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li>
              お弁当配達に関してましては、「配達距離」「注文金額」によりご対応できない場合がございますのでご了承ください。
            </li>
          </div>
          <div className="flex flex-row">
            <li className="mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
            <li>お問合せに関しては、注文ページ「備考」にて承ります。</li>
          </div>
        </ul>
      </div>
    </>
  )
}

export default HomePageBase
