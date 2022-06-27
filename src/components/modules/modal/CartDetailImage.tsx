import { FC } from 'react'

interface Props {
  imagePath: string
}

const CartDetailImage: FC<Props> = (props) => {
  const { imagePath } = props

  return <img src={imagePath} width="100" />
}

export default CartDetailImage
