import React from 'react'
import { useRouter } from 'next/router'
// NOTE: original
import { HomeLayout } from '../layout'
import {
  OrderMenueView,
  OrderClientView,
  OrderConfiButton,
} from '../modules/orderPageParts'
// NOTE: Redux関連

const OrderBase = () => {
  return (
    <HomeLayout title="注文確認">
      <OrderMenueView />
      <OrderClientView />
      <OrderConfiButton />
    </HomeLayout>
  )
}

export default OrderBase
