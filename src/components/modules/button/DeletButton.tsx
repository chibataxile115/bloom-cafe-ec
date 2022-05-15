import React, { FC } from 'react'
import { Button } from '@material-ui/core'

// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks'
import {
  selectStoringData,
  updatedCart,
} from '../../../redux/features/storingdateSlice'

interface Props {
  deleteButtonID: number
}

const DeletButton: FC<Props> = (props) => {
  const { deleteButtonID } = props

  const dispatch = useAppDispatch()
  const storingDataSelector = useAppSelector(selectStoringData)
  const targetDeletecart = (targetIndex: number) => {
    if (storingDataSelector[deleteButtonID].isInCart == true) {
      //isIncartがtrueだったら商品が登録されている状態なので、削除する
      const updateArg2 = { targetIndex: deleteButtonID, updateCart: false }
      dispatch(updatedCart(updateArg2))
    }
  }

  return (
    <div>
      {/* カートに追加する */}
      <Button
        id={`decrementButton${deleteButtonID}`}
        color="primary"
        style={{ margin: '5px', fontSize: '20px', padding: '0' }}
        onClick={() => targetDeletecart(deleteButtonID)}
      >
        削除
      </Button>
    </div>
  )
}
export default DeletButton

// // FIXME: 注文確認画面

// {storingDataSelector.map((item) => (
//     {!item.isInCart && (  // isIncartがfalseだったら表示しない
//       <li key={item.id}>
//       <p>{item.name}</p>
//     </li>
//   )}

// ))}

// 注文内容はこちら
// // ・商品１ isIncartがfalseだったらか出力しない
// ・商品２
// ・商品３
