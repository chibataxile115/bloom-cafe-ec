import { FC } from 'react'
import Image from 'next/image'
// Originals
import { ImageLoader } from '../../../../lib'

interface Props {
  imagePath: string
}

const CartImageView: FC<Props> = (props) => {
  const { imagePath } = props

  return (
    <div>
      <Image
        loader={() => ImageLoader()}
        src={ImageLoader(imagePath, 100)}
        width={100}
        height={100}
        className="m-0 items-center justify-center rounded-md p-0"
        unoptimized
      />
    </div>
  )
}

export default CartImageView
