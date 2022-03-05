import React, { FC, useState, useCallback } from 'react'
import { Button } from '@material-ui/core'

interface Props {
  countButtonID: number
}

const ButtonCount: FC<Props> = (props) => {
  const { countButtonID } = props

  const [count, setCount] = useState(0)

  const increment = () => setCount((prevCount) => prevCount + 1)
  const decrement = () => setCount((prevCount) => prevCount - 1)

  return (
    <div>
      <h1>{count}</h1>
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
