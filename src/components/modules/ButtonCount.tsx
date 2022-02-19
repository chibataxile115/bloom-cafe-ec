import React, { useState, useCallback } from 'react'
import { Button } from '@material-ui/core'

const ButtonCount = ( ) => {
  const [count, setCount] = useState(0)

  const increment = () => setCount((prevCount) => prevCount + 1)
  const decrement = () => setCount((prevCount) => prevCount - 1)

  return (
    <div>
      <h1>{count}</h1>
      <Button
        color="secondary"
        style={{ margin: '5px', fontSize: '20px', padding: '0' }}
        onClick={increment}
      >
        +
      </Button>
      <Button
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