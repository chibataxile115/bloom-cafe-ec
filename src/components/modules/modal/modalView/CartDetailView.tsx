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
              <div className="mb-4 flex">
                <CartImageView imagePath={item.imageURL} />
                <article className="ml-2 flex flex-col">
                  <section className="flex flex-col">
                    <h1 className="mt-2">{item.name}</h1>
                    <p className="mt-2">{item.count}個</p>
                  </section>
                  <section className="flex items-center">
                    <section className="mt-4">
                      <CountButton countButtonID={item.id} />
                    </section>
                    <section className="mt-4">
                      <DeleteButton
                        deleteButtonID={item.id}
                        deleteDocID={item.docID}
                      />
                    </section>
                  </section>
                </article>
              </div>
            </li>
          )}
        </div>
      ))}
    </ul>
  )
}

export default CartDetailView
