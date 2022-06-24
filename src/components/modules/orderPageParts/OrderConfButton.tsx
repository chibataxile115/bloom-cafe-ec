import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { MenueList } from '../../../types/types'
// NOTE:Custom Hook
import { useLiff, LiffContext } from '../../../hooks/liff/useLiffProvider'
// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks'
import { selectStep, changeState } from '../../../redux/features/step/stepSlice'
import { selectMenueList } from '../../../redux/features/menue/menueListSlice'
import { selectClientInfo } from '../../../redux/features/clientInfoSlice'

const OrderConfButton = () => {
  const router = useRouter()

  const dispatch = useAppDispatch()

  const menueListSelector = useAppSelector(selectMenueList)
  const ClientInfoSelector = useAppSelector(selectClientInfo)

  const messageWithProcessedMemuList = () => {
    let processedMessage = `■■■ 注文内容 ■■■\n`

    menueListSelector.forEach((item) => {
      if (item.isInCart) {
        const calcedPlce = Math.floor(
          item.plice * item.count * 1.1
        ).toLocaleString()

        processedMessage =
          processedMessage +
          '・' +
          item.name +
          ' : ' +
          item.count +
          '個\n' +
          '   ' +
          calcedPlce +
          '円\n'
      }
    })

    return processedMessage
  }
  const messageWithProcessedClientInfo = () => {
    let processedMessage = `■■■ お客様情報 ■■■\n`

    processedMessage =
      processedMessage +
      '● 配達先住所\n' +
      '〒' +
      ClientInfoSelector.zipcode +
      '\n' +
      ClientInfoSelector.prefectures +
      ClientInfoSelector.municipalities +
      ClientInfoSelector.addressBuilding +
      '\n' +
      '\n' +
      '● お客様氏名\n' +
      ClientInfoSelector.clientName +
      '\n' +
      '\n' +
      '● ご連絡先\n' +
      ClientInfoSelector.phoneNumber +
      '\n' +
      '\n' +
      '● 配達日時\n' +
      ClientInfoSelector.deliveryDate +
      '\n' +
      '\n' +
      '● 配達時間\n' +
      ClientInfoSelector.deliveryTime

    return processedMessage
  }

  const { loggedIn, isInClient, getNameWithLiffOpen, sendMessage, login } =
    useLiff()
  const liff = useContext(LiffContext)

  const sendMessageToLine = () => {
    if (!loggedIn) {
      login
    }
    if (isInClient) {
      const messageOrderDetail = messageWithProcessedMemuList()
      const messageClientInfo = messageWithProcessedClientInfo()

      sendMessage(messageOrderDetail)
      sendMessage(messageClientInfo)
    }
  }

  const clientPageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 2 }))
    router.push('/client')
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
        onClick={sendMessageToLine}
      >
        注文を確定する
      </button>
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
        onClick={clientPageClick}
      >
        お客様情報へ戻る
      </button>
    </div>
  )
}

export default OrderConfButton
