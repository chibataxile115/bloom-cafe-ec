// originals
// NOTE: Redux関連
import { useAppSelector } from '../../../redux/app/hooks'
import { selectMenueList } from '../../../redux/features/menue/menueListSlice'

const OrderMenueView: React.FC = () => {
  const menueListSelector = useAppSelector(selectMenueList)

  return (
    <ul
      className="
    mx-2 mt-4
    flex
    w-full
    max-w-[50vw]
    flex-col
    rounded-md bg-gray-200 p-2
    text-sm
    "
    >
      {menueListSelector.map((item) => (
        <div key={item.id}>
          {item.isInCart && (
            <li key={item.id}>
              <span className="mt-2 block w-full appearance-none rounded border bg-white py-2 px-2 leading-tight text-gray-700 shadow outline-black focus:outline">
                <p>・{item.name}</p>
                <p>{item.count}個</p>
              </span>
            </li>
          )}
        </div>
      ))}
    </ul>
  )
}

export default OrderMenueView
