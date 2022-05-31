import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
// Originals
import { ImageLoader } from '../../../../lib'

interface Props {
  imagePath: string
}

const ImageViewer: FC<Props> = (props) => {
  const { imagePath } = props

  return (
    <div>
      <Image
        loader={() => ImageLoader()}
        src={ImageLoader(imagePath, 190)}
        width={190}
        height={190}
        className="m-0 items-center justify-center rounded-md p-0"
        unoptimized
      />
    </div>
  )
}

export default ImageViewer
