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
      <article>
        <section>
          <h1>・郵便番号</h1>
          <p className="block w-full appearance-none rounded border bg-white py-2 px-2 leading-tight text-gray-700 shadow outline-black focus:outline">
            {ClientInfoSelector.zipcode}
          </p>
        </section>
        <section className="mt-4">
          <h1>・都道府県</h1>
          <p className="block w-full appearance-none rounded border bg-white py-2 px-2 leading-tight text-gray-700 shadow outline-black focus:outline">
            {ClientInfoSelector.prefectures}
          </p>
        </section>
        <section className="mt-4">
          <h1>・市区町村</h1>
          <p className="block w-full appearance-none rounded border bg-white py-2 px-2 leading-tight text-gray-700 shadow outline-black focus:outline">
            {ClientInfoSelector.municipalities}
          </p>
        </section>
        <section className="mt-4">
          <h1>・番地・建物</h1>
          <p className="block w-full appearance-none rounded border bg-white py-2 px-2 leading-tight text-gray-700 shadow outline-black focus:outline">
            {ClientInfoSelector.addressBuilding}
          </p>
        </section>
        <section className="mt-4">
          <h1>・会社名・お客様名</h1>
          <p className="block w-full appearance-none rounded border bg-white py-2 px-2 leading-tight text-gray-700 shadow outline-black focus:outline">
            {ClientInfoSelector.clientName}
          </p>
        </section>
        <section className="mt-4">
          <h1>・連絡先</h1>
          <p className="block w-full appearance-none rounded border bg-white py-2 px-2 leading-tight text-gray-700 shadow outline-black focus:outline">
            {ClientInfoSelector.phoneNumber}
          </p>
        </section>
        <section className="mt-4">
          <h1>・配達日</h1>
          <p className="block w-full appearance-none rounded border bg-white py-2 px-2 leading-tight text-gray-700 shadow outline-black focus:outline">
            {ClientInfoSelector.deliveryDate}
          </p>
        </section>
        <section className="mt-4">
          <h1>・受取時間</h1>
          <p className="block w-full appearance-none rounded border bg-white py-2 px-2 leading-tight text-gray-700 shadow outline-black focus:outline">
            {ClientInfoSelector.deliveryTime}
          </p>
        </section>
      </article>
    </div>
  )
}
export default OrderClientView
