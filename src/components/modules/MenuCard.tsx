import React, { FC } from 'react'

import { ButtonCount, ImageViewer } from './menue/menueparts'
// Redux関連
import { useAppSelector } from '../../redux/app/hooks'
import { selectMenueList } from '../../redux/features/menue/menueListSlice'

const MenuCard: FC = () => {
  const menueListSelector = useAppSelector(selectMenueList)

  return (
    <ul className="flex flex-wrap ">
      {menueListSelector.map((item, index) => (
        <li
          key={index}
          className="
          m-[calc(20px/2)]
          flex w-[calc(100%/2_-_20px)]
          flex-col
          rounded-md
          bg-gray-200
          p-2
          text-sm
          shadow-md sm:m-[calc(40px/2)]
          sm:w-[calc(100%/3_-_40px)]
          "
        >
          {/* // TODO: カード毎のデザインはここのclassNameを修正する */}
          <ImageViewer imagePath={item.imageURL} />
          <span className="block">
            <p>{item.name}</p>
          </span>
          <span className="flex">
            <p className="mr-6 flex-1">￥{item.plice}</p>
            <p className="mr-14 flex-1">{item.count}個</p>
          </span>

          <ButtonCount countButtonID={item.id} />
        </li>
      ))}
    </ul>
  )
}
export default MenuCard
