import { useState, useEffect } from 'react'
// originals
import { DeleteButton } from '../../button'
// types
import { StoringData } from '../../../../types/types'
// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../../../redux/app/hooks'
import { selectStoringData } from '../../../../redux/features/storingdateSlice'

const CartDetailView: React.FC = () => {
  const [demoStorignData, setDemoStorigData] = useState<StoringData[]>([])

  const storingDataSelector = useAppSelector(selectStoringData)

  useEffect(() => {
    console.log('CartDetailView')
    setDemoStorigData(storingDataSelector)
  }, [storingDataSelector])

  return (
    <div className="flex flex-col p-10">
      {storingDataSelector.map((item) => (
        <li key={item.id}>
          <p>{item.name}</p>
          <DeleteButton deleteButtonID={item.id} />
        </li>
      ))}
    </div>
  )
}

export default CartDetailView
