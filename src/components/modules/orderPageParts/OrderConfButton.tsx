import React, { useContext } from 'react'
import { useRouter } from 'next/router'
// NOTE:Custom Hook
import { useLiff, LiffContext } from '../../../hooks/liff/useLiffProvider'
// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks'
import { selectStep, changeState } from '../../../redux/features/step/stepSlice'
import { selectMenueList } from '../../../redux/features/menue/menueListSlice'
import { selectClientInfo } from '../../../redux/features/clientInfoSlice'
import { selectCartDetail } from '../../../redux/features/cartdetailSlice'
// originals
import { ArrowButton } from '../../atoms'

const OrderConfButton = () => {
  const router = useRouter()

  const dispatch = useAppDispatch()

  const menueListSelector = useAppSelector(selectMenueList)
  const ClientInfoSelector = useAppSelector(selectClientInfo)
  const cartDetailSelector = useAppSelector(selectCartDetail)

  const messageWithProcessedMemuList = () => {
    let processedMessage = `■■■ 注文内容 ■■■\n`

    menueListSelector.forEach((item) => {
      if (item.isInCart) {
        const calcedPlce = Math.floor(
          // NOTE:消費税追加
          // item.plice * item.count * 1.1
          item.plice * item.count
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

  const { loggedIn, isInClient, sendMessage, login } = useLiff()
  const liff = useContext(LiffContext)

  const sendMessageToLine = () => {
    // FIXME:thanksPageの作成が完了したら削除する
    router.push('/thanks')

    if (!loggedIn) {
      login
    }
    if (isInClient) {
      const messageOrderDetail = messageWithProcessedMemuList()
      const messageClientInfo = messageWithProcessedClientInfo()

      sendMessage(messageOrderDetail)
      sendMessage(messageClientInfo)
      router.push('/thanks')
    }
  }

  const clientPageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 3 }))
    router.push('/client')
  }

  return (
    <div className="flex items-center justify-between">
      <button
        className="ml-10 rounded-full bg-white p-2 shadow-lg outline-black"
        type="button"
        onClick={clientPageClick}
      >
        <ArrowButton ClassName="h-12 w-12" direction="left" />
      </button>

      <button
        className=" mr-10 rounded-full bg-white p-2 shadow-lg outline-black"
        type="button"
        onClick={sendMessageToLine}
      >
        注文を確定 ￥
        {Math.floor(cartDetailSelector.totalPlice).toLocaleString()}
      </button>
    </div>
  )
}

export default OrderConfButton
