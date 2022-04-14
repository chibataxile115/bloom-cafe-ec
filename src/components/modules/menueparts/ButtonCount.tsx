import React, { FC, useState, useCallback } from 'react'
import { Button } from '@material-ui/core'

// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks'
import {
  selectStoringData,
  addOrder,
  incrementOrder,
  decrementOrder,
} from '../../../redux/features/storingdateSlice'
import {
  selectMenueList,
  updatedMenue,
} from '../../../redux/features/menue/menueListSlice'

interface Props {
  countButtonID: number
}

// ・numberで受け取りたいのに、stringで受け取ってしまっていたところ
// ・dispatchで渡す引数をオブジェクト一つで渡さなきゃいけないところを、
// 引数２つで渡してしまっていたところ

// ・Propsの型で指定していた変数に予約後を使用してしまっていたところ

const ButtonCount: FC<Props> = (props) => {
  const { countButtonID } = props

  const dispatch = useAppDispatch()
  const storingDataSelector = useAppSelector(selectStoringData)
  const menueListSelector = useAppSelector(selectMenueList)

  const incrementCount = (targetIndex: number) => {
    if (menueListSelector[countButtonID].isInit == true) {
      dispatch(addOrder(1, '', true, 1, 'https://jflasj', 1))

      const updateArg = { targetIndex: countButtonID, updatedState: false }
      dispatch(updatedMenue(updateArg))
    } else if (menueListSelector[countButtonID].isInit == false) {
      dispatch(
        incrementOrder({
          ...storingDataSelector,
          targetIndex: targetIndex,
        })
      )
    }
  }

  const decrementCount = (targetIndex: number) => {
    if (menueListSelector[countButtonID].isInit == true) {
      //デクリメントできない
      alert('やればできる')
      return
    } else if (menueListSelector[countButtonID].isInit == false) {
      dispatch(
        decrementOrder({
          ...storingDataSelector,
          targetIndex: targetIndex,
        })
      )
    }
  }

  const sample = (mode: boolean) => {
    console.log(menueListSelector[countButtonID].isInit)
    console.log(`countButtonID : [${countButtonID}]`)

    if (mode) {
      dispatch(addOrder(1, '', true, 1, 'https://jflasj', 1))
      // TODO: menueListSelector[countButtonID].isInit をピンポイントで更新する関数を作る
      // FIXME: とりあえずは代案で試してみる

      const updateArg = { targetIndex: countButtonID, updatedState: false }
      dispatch(updatedMenue(updateArg))
    } else {
      // false
    }
  }

  return (
    <div className="flex flex-col">
      <ul>
        {storingDataSelector.map((item, index: number) => {
          return <li key={index}>{`個数: ${item.count} : ${item.count}`}</li>
        })}
      </ul>
      <div className="flex flex-row">
        {/* プラスボタン */}
        <Button
          id={`incrementButton${countButtonID}`}
          color="secondary"
          style={{ margin: '3px', fontSize: '20px', padding: '0' }}
          onClick={() => incrementCount(countButtonID)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        {/* マイナスボタン */}
        <Button
          id={`decrementCount${countButtonID}`}
          color="secondary"
          style={{ margin: '3px', fontSize: '20px', padding: '0' }}
          onClick={() => decrementCount(countButtonID)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        {/* カートに追加する */}
        <Button
          id={`decrementButton${countButtonID}`}
          color="primary"
          style={{ margin: '5px', fontSize: '20px', padding: '0' }}
          onClick={() => sample(menueListSelector[countButtonID].isInit)}
        >
          カートに入れるデモ
        </Button>
      </div>
    </div>
  )
}
export default ButtonCount
