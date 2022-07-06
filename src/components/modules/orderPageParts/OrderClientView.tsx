import React, { useState } from 'react'
// Originals
import { DropDownButton } from '../../atoms/button'
// NOTE: Redux関連
import { useAppSelector } from '../../../redux/app/hooks'
import { selectClientInfo } from '../../../redux/features/clientInfoSlice'

const OrderClientView: React.FC = () => {
  const ClientInfoSelector = useAppSelector(selectClientInfo)

  const [isMenu, setIsMenu] = useState(true)

  return (
    <>
      <span
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault()
          setIsMenu(!isMenu)
        }}
        className="
        flex w-full 
        items-center 
        rounded-md 
        border-2
        border-black
        bg-white
        px-4
        "
      >
        <h1 className="text-lg font-bold">お客様情報</h1>
        <button
          className="
          mr-0
          ml-auto
          flex p-2
          "
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            setIsMenu(!isMenu)
          }}
        >
          <DropDownButton
            ClassName="
            h-8 w-8
            items-center
            text-black
            "
            direction={isMenu ? 'up' : 'down'}
          />
        </button>
      </span>
      {isMenu && (
        <table className="flex w-full flex-col justify-between rounded-md bg-white p-4">
          <tbody>
            <tr className="mt-2 flex w-full justify-between">
              <th>郵便番号</th>
              <td>{ClientInfoSelector.zipcode}</td>
            </tr>

            <tr className="mt-2 flex w-full justify-between">
              <th className="ml-0">都道府県</th>
              <td>{ClientInfoSelector.prefectures}</td>
            </tr>

            <tr className="mt-2 flex w-full justify-between">
              <th className="ml-0">市区町村</th>
              <td>{ClientInfoSelector.municipalities}</td>
            </tr>

            <tr className="mt-2 flex w-full justify-between">
              <th className="ml-0">番地建物</th>
              <td>{ClientInfoSelector.addressBuilding}</td>
            </tr>

            <tr className="mt-2 flex w-full flex-col">
              <th className="ml-0 flex">お客様名</th>
              <td>{ClientInfoSelector.clientName}</td>
            </tr>

            <tr className="mt-2 flex w-full flex-col">
              <th className="ml-0 flex">連絡先</th>
              <td>{ClientInfoSelector.phoneNumber}</td>
            </tr>

            <tr className="mt-2 flex w-full flex-col">
              <th className="ml-0 flex">配達日</th>
              <td>{ClientInfoSelector.deliveryDate}</td>
            </tr>

            <tr className="mt-2 flex w-full flex-col">
              <th className="ml-0 flex">受取時間</th>
              <td>{ClientInfoSelector.deliveryTime}</td>
            </tr>

            <tr className="mt-2 flex w-full flex-col">
              <th className="ml-0 flex">備考</th>
              <td>{ClientInfoSelector.inputForm}</td>
            </tr>
          </tbody>
          <tfoot />
        </table>
      )}
    </>
  )
}
export default OrderClientView
