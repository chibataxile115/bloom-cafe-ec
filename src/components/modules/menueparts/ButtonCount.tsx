import React, { FC, useState, useCallback } from 'react'
import { Button } from '@material-ui/core'

// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks'
import {
  selectStoringData,
  addOrder,
  updateOrder,
} from '../../../redux/features/storingdateSlice'

interface Props {
  countButtonID: number
}

const ButtonCount: FC<Props> = (props) => {
  const { countButtonID } = props

  const dispatch = useAppDispatch()
  const storingDataSelector = useAppSelector(selectStoringData)

  const addCart = () =>
    dispatch(addOrder(1, 1500, 'https://github.com/', 'おにぎり'))

  const incrementCount = (updatedCount: number, targetIndex: number) => {
    // falseだったら・配列が空だったら
    if (!storingDataSelector) {
      addOrder(1, 1500, 'https://github.com/', 'おにぎり')
    } else if (storingDataSelector.length) {
    }
    try {
      const before = storingDataSelector[countButtonID].count
      dispatch(
        updateOrder({
          ...storingDataSelector,
          targetIndex: targetIndex,
          updatedCount: updatedCount,
        })
      )
    } catch {
      addOrder(1, 1500, 'https://github.com/', 'おにぎり')
    }
  }

  const decrementCount = (updatedCount: number, targetIndex: number) => {
    dispatch(
      updateOrder({
        ...storingDataSelector,
        targetIndex: targetIndex,
        updatedCount: updatedCount,
      })
    )
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
          onClick={() =>
            incrementCount(
              storingDataSelector[countButtonID].count + 1,
              countButtonID
            )
          }
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
          id={`decrementButton${countButtonID}`}
          color="primary"
          style={{ margin: '5px', fontSize: '20px', padding: '0' }}
          onClick={() =>
            decrementCount(
              storingDataSelector[countButtonID].count - 1,
              countButtonID
            )
          }
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
      </div>
    </div>
  )
}
export default ButtonCount
