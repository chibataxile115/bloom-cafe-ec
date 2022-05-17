import { FC } from 'react'
import Link from 'next/link'

interface Props {
  imagePath: string
}

const CartDetailImage: FC<Props> = (props) => {
  const { imagePath } = props

  return <img src={imagePath} width="100" />
}

export default CartDetailImage
