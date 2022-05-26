// originals
import { DeleteButton, CountButton } from '../../button'
// NOTE: Redux関連
import { useAppSelector } from '../../../../redux/app/hooks'
import { selectStoringData } from '../../../../redux/features/storingdateSlice'

const CartDetailView: React.FC = () => {
  const storingDataSelector = useAppSelector(selectStoringData)

  return (
    <div className="flex flex-col p-10">
      {storingDataSelector.map((item) => (
        <li key={item.id}>
          <p>{item.name}</p>
          <p>{item.count}</p>
          <DeleteButton deleteButtonID={item.id} />
          <CountButton countButtonID={item.id} />
        </li>
      ))}
    </div>
  )
}

export default CartDetailView
