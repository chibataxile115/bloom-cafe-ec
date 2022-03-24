import { FC } from 'react'
import { Button } from '@material-ui/core'

import { ButtonCount, CartButton, ImageViewer } from './MenueParts'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import {
  selectMenueList,
  addMenue,
} from '../../redux/features/menue/menueListSlice'

const Card: FC = () => {
  const dispatch = useAppDispatch()
  const menueListSelector = useAppSelector(selectMenueList)

  return (
    <div className="mx-36 h-3 bg-gray-700">
      <div className="w-full">
        {menueListSelector.map((item) => (
          // TODO: カード毎のデザインはここのclassNameを修正する
          <li key={item.id} className="">
            <ImageViewer imagePath={item.imageURL} />
            <ButtonCount countButtonID={item.id} />
            <CartButton cartButtonID={item.id} />
          </li>
        ))}
      </div>
    </div>
  )
}
export default Card
