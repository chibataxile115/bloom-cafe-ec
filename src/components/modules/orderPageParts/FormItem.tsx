import axios from 'axios'
import React, { ChangeEvent, useState } from 'react'
// Originals
import { SnackBar } from '../../atoms'
// types
import { ClientInfo } from '../../../types/types'
// バリデーション関連
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { OrderFormSchema } from '../../../lib'
// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks'
import {
  selectClientInfo,
  updateInfo,
} from '../../../redux/features/clientInfoSlice'
import { selectSnackBar } from '../../../redux/features/snackbar/snackbarSlice'
// Custom Hook
import { useFetchFromZipcode } from '../../../hooks/order/useFetchFromZipcode'

const FormItem = () => {
  const dispatch = useAppDispatch()
  const clientInfoSelector = useAppSelector(selectClientInfo)
  const snackBarSelector = useAppSelector(selectSnackBar)
  const orderFormSchema = OrderFormSchema()

  const deliveryTimes = [
    { id: 0, value: '-', state: true },
    { id: 1, value: '10:00', state: true },
    { id: 2, value: '10:30', state: true },
    { id: 3, value: '11:00', state: true },
    { id: 4, value: '11:30', state: true },
    { id: 5, value: '12:00', state: true },
    { id: 6, value: '12:30', state: true },
    { id: 7, value: '13:00', state: true },
  ]

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClientInfo>({
    mode: 'onChange',
    criteriaMode: 'all',
    resolver: yupResolver(orderFormSchema),
  })

  const { fetchZipcode } = useFetchFromZipcode()

  const handleZipcode = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(
      updateInfo({
        ...clientInfoSelector,
        zipcode: event.target.value,
        prefectures: clientInfoSelector.prefectures,
        municipalities: clientInfoSelector.municipalities,
      })
    )

  const handleFetchFromZipcode = () =>
    // event: React.FormEvent<HTMLButtonElement>
    {
      // event.preventDefault()
      fetchZipcode()
    }

  // FIXME

  const orderSubmit: SubmitHandler<ClientInfo> = async (data) => {
    console.log(`zipcode: [${data.zipcode}]`)
  }

  return (
    <div className=" mt-3 flex w-full justify-start pt-3">
      {/* FIXME: 後で戻す */}

      <form
        className="mb-4 rounded bg-gray-100 px-8 pt-6 pb-8 shadow-md"
        onSubmit={handleSubmit(orderSubmit)}
      >
        {/* 郵便番号 */}
        <div className="mb-4 flex max-h-[100px] flex-row">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="address"
          >
            郵便番号
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="zipcode"
            type="text"
            placeholder="090123456"
            {...register('zipcode')}
            value={clientInfoSelector.zipcode}
            onChange={handleZipcode}
          />
          <button
            className="m-2 border-2 bg-red-500 p-2"
            type="button"
            onClick={handleFetchFromZipcode}
          >
            住所検索
          </button>
        </div>

        <p className="mb-4 font-bold text-red-500">{errors.zipcode?.message}</p>

        <div className="flex flex-row">
          {/* 都道府県 */}
          <div className="mb-4 mr-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="address1"
            >
              都道府県
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="address1"
              type="text"
              placeholder="青森"
              value={clientInfoSelector.prefectures}
              onChange={() => console.log('demo')}
              {...register('prefectures')}
            />
          </div>
          <p className="mb-4 font-bold text-red-500">
            {errors.prefectures?.message}
          </p>
          {/* 市町村 */}
          <div className="mb-4 ml-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="address2"
            >
              市区町村
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="address2"
              type="text"
              placeholder="○○市"
              value={clientInfoSelector.municipalities}
              onChange={() => console.log('demo')}
              {...register('municipalities')}
            />
          </div>{' '}
          <p className="mb-4 font-bold text-red-500">
            {errors.municipalities?.message}
          </p>
          {/* 番地・建物 */}
          <div className="mb-4 ml-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="address2"
            >
              番地・建物
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              type="text"
              placeholder="番地・建物"
              {...register('addressbuilding')}
            />
          </div>{' '}
          <p className="mb-4 font-bold text-red-500">
            {errors.addressbuilding?.message}
          </p>
          {/* 会社名 */}
          <div className="mb-4 ml-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="address2"
            >
              会社名・お客様名
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              type="text"
              placeholder="会社名・お客様名"
              {...register('clientname')}
            />
          </div>
          <p className="mb-4 font-bold text-red-500">
            {errors.clientname?.message}
          </p>
          {/* 連絡先 */}
          <div className="mb-4 ml-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="address2"
            >
              連絡先
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              type="text"
              placeholder="連絡先"
              onChange={() => console.log('demo')}
              {...register('phonenumber')}
            />
          </div>
          <p className="mb-4 font-bold text-red-500">
            {errors.phonenumber?.message}
          </p>
          {/* 配達日時 */}
          <div className="mb-4 ml-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="address2"
            >
              配達日時
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              type="date"
              placeholder="配達日時"
              onChange={() => console.log('demo')}
              {...register('deliveryday')}
            />
          </div>
          <p className="mb-4 font-bold text-red-500">
            {errors.deliveryday?.message}
          </p>
          {/* 受取時間 */}
          <div className="mb-4 ml-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="address2"
            >
              受取時間
            </label>
            <select
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="selectTime"
              placeholder="受取時間"
              onChange={() => console.log('demo')}
              {...register('deliverytime')}
            >
              {/* <DeliveryTimesView /> */}
              {deliveryTimes.map((item) => (
                <option value={item.value} key={item.id}>
                  {item.state && item.value.replaceAll(/"/g, '')}
                </option>
              ))}
            </select>
          </div>
          <p className="mb-4 font-bold text-red-500">
            {errors.deliverytime?.message}
          </p>
        </div>

        {/* <div className="flex items-center justify-center">
          <button
            className="
            focus:shadow-outline
            w-4/12
            min-w-[150px] rounded
            bg-blue-400
            py-2 px-4 font-bold
            text-white
            hover:bg-blue-500
            focus:outline-none
            disabled:bg-gray-300 disabled:text-gray-400
            "
            // disabled={uploadImagesSelector.length === 0}
            type="submit"
          >
            注文を確定へ進む
          </button>
        </div> */}
      </form>
      {/* スナックバー */}
      <SnackBar
        message={
          snackBarSelector.mode === 'error' && '住所取得に失敗しました。'
        }
        isOpen={snackBarSelector.isOpenTheMenueRegistSnackbar}
        mode={snackBarSelector.mode}
      />
    </div>
  )
}
export default FormItem
