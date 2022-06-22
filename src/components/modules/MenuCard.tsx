import React, { FC } from 'react'

import { ButtonCount, CartButton, ImageViewer } from './menue/menueparts'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import {
  selectMenueList,
  addMenue,
} from '../../redux/features/menue/menueListSlice'

const MenuCard: FC = () => {
  const dispatch = useAppDispatch()
  const menueListSelector = useAppSelector(selectMenueList)

  return (
    <ul className="flex flex-row flex-wrap justify-center">
      {menueListSelector.map((item, index) => (
        <li
          key={index}
          className="
          mx-2 mt-4
          flex
          w-full
          max-w-[40vw]
          flex-col
          rounded-md bg-gray-200 p-2
          text-sm
          "
        >
          {/* // TODO: カード毎のデザインはここのclassNameを修正する */}
          <ImageViewer imagePath={item.imageURL} />
          <ButtonCount countButtonID={item.id} />
        </li>
      ))}
    </ul>
  )
}
export default MenuCard
