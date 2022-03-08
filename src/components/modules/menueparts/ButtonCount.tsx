import React, { FC, useState, useCallback } from 'react'
import { Button } from '@material-ui/core'

// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks'
import {
  selectCount,
  resetCount,
  increment as incrementCount,
  decrement as decrementCount,
} from '../../../redux/features/countSlice'

interface Props {
  countButtonID: number
}

const ButtonCount: FC<Props> = (props) => {
  const { countButtonID } = props

  const dispatch = useAppDispatch()
  const countSelector = useAppSelector(selectCount)

  const increment = () => dispatch(incrementCount())
  const decrement = () => dispatch(decrementCount())

  return (
    <div>
      <h1>{countSelector.countCart}</h1>
      <Button
        id={`incrementButton${countButtonID}`}
        color="secondary"
        style={{ margin: '3px', fontSize: '20px', padding: '0' }}
        onClick={increment}
      >
        +
      </Button>
      <Button
        id={`decrementButton${countButtonID}`}
        color="primary"
        style={{ margin: '5px', fontSize: '20px', padding: '0' }}
        onClick={decrement}
      >
        -
      </Button>
    </div>
  )
}
export default ButtonCount
