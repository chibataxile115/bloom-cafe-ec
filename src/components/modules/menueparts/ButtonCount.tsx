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

interface Props {
  countButtonID: number
}

const ButtonCount: FC<Props> = (props) => {
  const { countButtonID } = props

  const dispatch = useAppDispatch()
  const storingDataSelector = useAppSelector(selectStoringData)

  const addCart = () => {}
  // dispatch(addOrder(1, 1500, 'https://github.com/', 'おにぎり'))

  const incrementCount = (updatedCount: number, targetIndex: number) => {
    dispatch(
      incrementOrder({
        ...storingDataSelector,
        targetIndex: targetIndex,
        updatedCount: updatedCount,
      })
    )
  }

  const decrementCount = (updatedCount: number, targetIndex: number) => {
    dispatch(
      decrementOrder({
        ...storingDataSelector,
        targetIndex: targetIndex,
        updatedCount: updatedCount,
      })
    )
  }

  // const decrementCount = (updatedCount: number, targetIndex: number) => {}

  // const onClickIncrement = () => {
  //   dispatch(incrementOrder())
  // }

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
          onClick={() => incrementCount(0, 0)}
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
          onClick={() => decrementCount(0, 0)}
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
          onClick={() => {
            dispatch(addOrder(1, '', true, 1, 'https://jflasj', 123456))
          }}
        >
          カートに入れるデモ
        </Button>
      </div>
    </div>
  )
}
export default ButtonCount
