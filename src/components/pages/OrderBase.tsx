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
    <HomeLayout title="注文内容">
      <div className="mt-2 flex max-w-[95%] flex-col justify-start bg-gray-200 pt-3">
        <div className="mb-6 ml-2 flex flex-col pb-4">
          <OrderClientView />
        </div>
        <div className="mb-6 ml-2 flex flex-col">
          <OrderMenueView />
        </div>
        <div className="sticky bottom-0 z-20  mr-auto ml-auto flex items-center">
          <OrderConfButton />
        </div>
      </div>
    </HomeLayout>
  )
}

export default OrderBase
