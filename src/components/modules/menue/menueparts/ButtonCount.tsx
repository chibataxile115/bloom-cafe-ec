import React, { FC } from 'react'
import { Button } from '@material-ui/core'

// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../../../redux/app/hooks'
import {
  selectStoringData,
  addOrder,
} from '../../../../redux/features/storingdateSlice'
import {
  selectMenueList,
  updateCart,
} from '../../../../redux/features/menue/menueListSlice'
import {
  selectCartDetail,
  cartIncrementOrder,
  cartDecrementOrder,
} from '../../../../redux/features/cartdetailSlice'

interface Props {
  countButtonID: number
}

const ButtonCount: FC<Props> = (props) => {
  const { countButtonID } = props

  const dispatch = useAppDispatch()
  const storingDataSelector = useAppSelector(selectStoringData)
  const menueListSelector = useAppSelector(selectMenueList)

  const controlCart = (
    mode: 'increment' | 'decrement',
    targetIndex?: number
  ) => {
    if (
      mode === 'increment' &&
      menueListSelector[countButtonID].isInit == true
    ) {
      // 商品を新規登録
      const updateCartArg = {
        targetIndex: countButtonID,
        isInCartState: true,
        countState: 1,
      }
      dispatch(
        updateCart({
          ...menueListSelector,
          targetIndex: countButtonID,
          isInCartState: true,
          countState: menueListSelector[targetIndex].count + 1,
        })
      )

      // dispatch(updateCart(updateCartArg))
      dispatch(cartIncrementOrder())
    }

    if (
      mode === 'decrement' &&
      menueListSelector[countButtonID].isInit == true
    ) {
      dispatch(
        updateCart({
          ...menueListSelector,
          targetIndex: countButtonID,
          isInCartState:
            menueListSelector[targetIndex].count <= 1 ? false : true,
          countState:
            menueListSelector[targetIndex].count <= 1
              ? 0
              : menueListSelector[targetIndex].count - 1,
        })
      )
      dispatch(cartDecrementOrder())
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        {/* プラスボタン */}
        <Button
          id={`incrementButton${countButtonID}`}
          color="secondary"
          style={{ margin: '3px', fontSize: '20px', padding: '0' }}
          onClick={() => controlCart('increment', countButtonID)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        {/* マイナスボタン */}
        <Button
          id={`decrementCount${countButtonID}`}
          color="secondary"
          style={{ margin: '3px', fontSize: '20px', padding: '0' }}
          onClick={() => controlCart('decrement', countButtonID)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        {/* カートに追加する */}
        <Button
          id={`decrementButton${countButtonID}`}
          color="primary"
          style={{ margin: '5px', fontSize: '20px', padding: '0' }}
          onClick={() => controlCart('increment', countButtonID)}
        >
          カートに入れるデモ
        </Button>
      </div>
    </div>
  )
}
export default ButtonCount
