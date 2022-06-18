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
    max-w-[40vw]
    flex-col
    rounded-md bg-gray-200 p-2
    text-sm
    "
    >
      <p>注文内容</p>
      {menueListSelector.map((item) => (
        <div key={item.id}>
          {item.isInCart && (
            <li key={item.id}>
              <p>{item.name}</p>
              <p>{item.count}個</p>
            </li>
          )}
        </div>
      ))}
    </ul>
  )
}

export default OrderMenueView
