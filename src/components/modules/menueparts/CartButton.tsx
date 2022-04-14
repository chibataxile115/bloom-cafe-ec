import React, { FC, useState, useCallback } from 'react'

interface Props {
  cartButtonID: number
}

const CartButton: FC<Props> = (props) => {
  const { cartButtonID } = props

  return (
    <div>
      <button id={`cartButton${cartButtonID}`} className="">
        カートに追加する
      </button>
    </div>
  )
}
export default CartButton