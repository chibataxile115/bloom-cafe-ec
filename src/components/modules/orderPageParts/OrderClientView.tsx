// originals
// NOTE: Redux関連
import { useAppSelector } from '../../../redux/app/hooks'
import { selectClientInfo } from '../../../redux/features/clientInfoSlice'

const OrderClientView: React.FC = () => {
  const ClientInfoSelector = useAppSelector(selectClientInfo)

  return (
    <div
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
      <p>顧客情報</p>
      <h3>{ClientInfoSelector.zipcode}</h3>
    </div>
  )
}
export default OrderClientView
