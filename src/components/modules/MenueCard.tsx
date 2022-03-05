import { FC } from 'react'
import { ButtonCount, CartButton, ImageViewer } from './MenueParts'

const Card: FC = () => {
  const imageList = [
    { id: 0, image: '/blt-sand.jpg' },
    { id: 1, image: '/blt-sand.jpg' },
  ]

  return (
    <div className="mx-36 h-3 bg-gray-700">
      <div className="w-full">
        {imageList.map((item) => (
          // TODO: カード毎のデザインはここのclassNameを修正する
          <li key={item.id} className="">
            <ImageViewer imagePath={item.image} />
            <ButtonCount countButtonID={item.id} />
            <CartButton cartButtonID={item.id} />
          </li>
        ))}
      </div>
    </div>
  )
}
export default Card
