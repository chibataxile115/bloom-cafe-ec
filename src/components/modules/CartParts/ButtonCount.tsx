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

  return (
    <div className="flex flex-col">
      <ul>
        {storingDataSelector.map((item, index: number) => {
          return <li key={index}>{`個数: ${item.count} : ${item.count}`}</li>
        })}
      </ul>
    </div>
  )
}
export default ButtonCount
