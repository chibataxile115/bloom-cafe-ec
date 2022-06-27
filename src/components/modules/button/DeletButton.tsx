import React, { FC } from 'react'
// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks'
import {
  selectMenueList,
  updateCart as updateCartForMenueList,
} from '../../../redux/features/menue/menueListSlice'
import {
  selectCartDetail,
  updateCount as CartDetailForUpdateCount,
} from '../../../redux/features/cartdetailSlice'

interface Props {
  deleteButtonID: number
  deleteDocID: string
}

const DeletButton: FC<Props> = (props) => {
  const { deleteButtonID, deleteDocID } = props

  const dispatch = useAppDispatch()
  const menueListSelector = useAppSelector(selectMenueList)
  const cartdetailSelector = useAppSelector(selectCartDetail)

  const targetDeletecart = (targetIndex: number) => {
    if (menueListSelector[deleteButtonID].isInCart == true) {
      //menueListsliceをfalse
      dispatch(
        updateCartForMenueList({
          ...menueListSelector,
          targetIndex: deleteButtonID,
          isInCartState: false,
          addedCount: 0,
        })
      )
      dispatch(
        CartDetailForUpdateCount({
          targetMenueCount:
            cartdetailSelector.totalCount -
            menueListSelector[deleteButtonID].count,
          targetMenuePlice:
            cartdetailSelector.totalPlice -
            menueListSelector[deleteButtonID].plice *
              menueListSelector[deleteButtonID].count,
          mode: 'decrement',
        })
      )
    }
  }

  return (
    <div>
      {/* カートに追加する */}
      <button
        id={`decrementButton${deleteButtonID}`}
        className="
        focus:shadow-outline
        mx-auto
        mb-2 min-w-[150px]
        justify-between rounded-full
        border-2
        border-black
        bg-gray-400
        py-2 px-4 font-bold
        text-white
        hover:text-gray-100
        focus:outline-none
        "
        onClick={() => targetDeletecart(deleteButtonID)}
      >
        削除
      </button>
    </div>
  )
}
export default DeletButton
