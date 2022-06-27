// originals
import { DeleteButton, CountButton } from '../../button'
import { CartImageView } from '../modalView'
// NOTE: Redux関連
import { useAppSelector } from '../../../../redux/app/hooks'
import { selectMenueList } from '../../../../redux/features/menue/menueListSlice'

const CartDetailView: React.FC = () => {
  const menueListSelector = useAppSelector(selectMenueList)

  return (
    <ul className="flex flex-col p-10">
      {menueListSelector.map((item) => (
        <div key={item.id}>
          {item.isInCart && (
            <li key={item.id}>
              <CartImageView imagePath={item.imageURL} />
              <span className=" block px-5">
                <p className="mt-2">{item.name}</p>
                <p className="mt-2">{item.count}個</p>
              </span>
              <div className="mt-2">
                <CountButton countButtonID={item.id} />
              </div>
              <div className="mt-2 ml-6 mr-auto">
                <DeleteButton
                  deleteButtonID={item.id}
                  deleteDocID={item.docID}
                />
              </div>
            </li>
          )}
        </div>
      ))}
    </ul>
  )
}

export default CartDetailView
