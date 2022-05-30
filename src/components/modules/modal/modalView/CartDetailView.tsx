// originals
import { DeleteButton, CountButton } from '../../button'
// NOTE: Redux関連
import { useAppSelector } from '../../../../redux/app/hooks'
import { selectMenueList } from '../../../../redux/features/menue/menueListSlice'

const CartDetailView: React.FC = () => {
  const menueListSelector = useAppSelector(selectMenueList)

  return (
    <div className="flex flex-col p-10">
      {menueListSelector.map((item) => (
        <>
          {item.isInCart && (
            <li key={item.id}>
              <p>{item.name}</p>
              <p>{item.count}</p>
              <DeleteButton deleteButtonID={item.id} deleteDocID={item.docID} />
              <CountButton countButtonID={item.id} />
            </li>
          )}
        </>
      ))}
    </div>
  )
}

export default CartDetailView
