import { FC } from 'react'
import { Button } from '@material-ui/core'

import { ButtonCount } from './CartParts'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import {
  selectStoringData,
  addOrder,
} from '../../redux/features/storingdateSlice'

const CartCard: FC = () => {
  const dispatch = useAppDispatch()
  const StoringDataSelector = useAppSelector(selectStoringData)

  return (
    <div className="mx-36 h-3 bg-gray-700">
      <div className="w-full">
        {StoringDataSelector.map((item) => (
          // TODO: カード毎のデザインはここのclassNameを修正する
          <li key={item.id} className="">
            <ButtonCount countButtonID={item.id} />
          </li>
        ))}
      </div>
    </div>
  )
}
export default CartCard
