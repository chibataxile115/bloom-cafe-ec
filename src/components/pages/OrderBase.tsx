import React from 'react'
// NOTE: original
import { HomeLayout } from '../layout'
import {
  OrderMenueView,
  OrderClientView,
  OrderConfButton,
} from '../modules/orderPageParts'
// NOTE: Redux関連

const OrderBase = () => {
  return (
    <HomeLayout title="注文確認">
      <OrderMenueView />
      <OrderClientView />
      <OrderConfButton />
    </HomeLayout>
  )
}

export default OrderBase
