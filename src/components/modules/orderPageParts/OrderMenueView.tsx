import React, { useState } from 'react'
// Originals
import { DropDownButton } from '../../atoms/button'
// NOTE: Redux関連
import { useAppSelector } from '../../../redux/app/hooks'
import { selectMenueList } from '../../../redux/features/menue/menueListSlice'

const OrderMenueView: React.FC = () => {
  const menueListSelector = useAppSelector(selectMenueList)
  const [isMenu, setIsMenu] = useState(false)

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
        <h1 className="text-lg font-bold">ご注文内容</h1>
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
          {menueListSelector.map((item) => (
            <React.Fragment key={item.id}>
              {item.isInCart && (
                <tbody key={item.id}>
                  <tr className="flex w-full justify-between">
                    <th>{item.name}</th>
                    <td>
                      <p>{item.count}個</p>
                    </td>
                  </tr>
                </tbody>
              )}
            </React.Fragment>
          ))}

          <tfoot />
        </table>
      )}
    </>
  )
}

export default OrderMenueView
