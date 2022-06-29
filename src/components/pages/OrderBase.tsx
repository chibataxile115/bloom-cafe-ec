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
      <div className=" mt-3 flex w-full max-w-[95%] flex-col justify-start pt-3">
        <form className="mb-4 flex flex-col rounded bg-gray-200 px-8 pt-6 pb-8 shadow-md">
          <h1 className="w-1/3 rounded-full  bg-white p-2 shadow-lg outline-black">
            ご注文内容
          </h1>
          <OrderMenueView />
        </form>
        <form className="mb-4 flex flex-col rounded bg-gray-200 px-8 pt-6 pb-8 shadow-md">
          <h1 className="w-1/3 rounded-full  bg-white p-2 shadow-lg outline-black">
            お客様情報
          </h1>
          <OrderClientView />
        </form>
        <OrderConfButton />
      </div>
    </HomeLayout>
  )
}

export default OrderBase
