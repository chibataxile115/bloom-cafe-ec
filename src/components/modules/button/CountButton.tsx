import React, { FC } from 'react'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks'
import {
  selectMenueList,
  updateCart,
} from '../../../redux/features/menue/menueListSlice'
import {
  selectCartDetail,
  updateCount as updateCountForCartDetail,
} from '../../../redux/features/cartdetailSlice'
interface Props {
  countButtonID: number
}

const CountButton: FC<Props> = (props) => {
  const { countButtonID } = props

  const dispatch = useAppDispatch()
  const menueListSelector = useAppSelector(selectMenueList)
  const cartDetailSelector = useAppSelector(selectCartDetail)

  const controlCart = (
    mode: 'increment' | 'decrement',
    targetIndex: number
  ) => {
    if (
      mode === 'increment' &&
      menueListSelector[countButtonID].isInit == true
    ) {
      // 商品を新規登録
      dispatch(
        updateCart({
          targetIndex: countButtonID,
          isInCartState: true,
          addedCount: menueListSelector[targetIndex].count + 1,
        })
      )

      dispatch(
        updateCountForCartDetail({
          targetMenueCount: cartDetailSelector.totalCount + 1,
          targetMenuePlice:
            cartDetailSelector.totalPlice +
            menueListSelector[targetIndex].plice,
          mode: 'increment',
        })
      )
    }

    if (
      mode === 'decrement' &&
      menueListSelector[countButtonID].isInit == true
    ) {
      dispatch(
        updateCart({
          targetIndex: countButtonID,
          isInCartState:
            menueListSelector[targetIndex].count <= 1 ? false : true,
          addedCount:
            menueListSelector[targetIndex].count <= 1
              ? 0
              : menueListSelector[targetIndex].count - 1,
        })
      )

      dispatch(
        updateCountForCartDetail({
          targetMenueCount: cartDetailSelector.totalCount - 1,
          targetMenuePlice:
            cartDetailSelector.totalPlice -
            menueListSelector[targetIndex].plice,
          mode: 'decrement',
        })
      )
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        {/* プラスボタン */}
        <button
          id={`incrementButton${countButtonID}`}
          className="ml-4 box-content h-3 w-3 rounded-full border-2 border-black bg-white p-2"
          onClick={() => controlCart('increment', countButtonID)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className=" text-black"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {/* マイナスボタン */}
        <button
          id={`decrementCount${countButtonID}`}
          className="mr-2 box-content h-3 w-3 rounded-full border-2 border-white bg-black p-2"
          onClick={() => controlCart('decrement', countButtonID)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
export default CountButton
