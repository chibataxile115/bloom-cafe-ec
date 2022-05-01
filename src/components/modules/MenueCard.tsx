import React, { FC } from 'react'

import { ButtonCount, CartButton, ImageViewer } from './MenueParts'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import {
  selectMenueList,
  addMenue,
} from '../../redux/features/menue/menueListSlice'

const MenueCard: FC = () => {
  const dispatch = useAppDispatch()
  const menueListSelector = useAppSelector(selectMenueList)

  return (
    <div className="h-w-full">
      <div className="w-full">
        {menueListSelector.map((item, index) => (
          <div key={index} className="h-w-full mx-36 my-10 bg-gray-600">
            {/* // TODO: カード毎のデザインはここのclassNameを修正する */}
            <ImageViewer imagePath={item.imageURL} />
            <ButtonCount countButtonID={item.id} />
            <CartButton cartButtonID={item.id} />
          </div>
        ))}
      </div>
    </div>
  )
}
export default MenueCard
