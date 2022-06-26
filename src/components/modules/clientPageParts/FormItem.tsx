import React from 'react'
import { useRouter } from 'next/router'
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
import { selectStep, changeState } from '../../../redux/features/step/stepSlice'
// Custom Hook
import { useFetchFromZipcode } from '../../../hooks/order/useFetchFromZipcode'

const FormItem = () => {
  const dispatch = useAppDispatch()
  const clientInfoSelector = useAppSelector(selectClientInfo)
  const snackBarSelector = useAppSelector(selectSnackBar)
  const orderFormSchema = OrderFormSchema()
  const router = useRouter()

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
    criteriaMode: 'all',
    resolver: yupResolver(orderFormSchema),
  })

  const { fetchZipcode } = useFetchFromZipcode()

  const handleFetchFromZipcode = () => {
    fetchZipcode()
  }

  const orderSubmit: SubmitHandler<ClientInfo> = async (data) => {
    console.log(`zipcode: [${data.zipcode}]`)
    dispatch(changeState({ ...selectStep, stepIndex: 4 }))
    router.push('/order')
  }

  const toMenuPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    // stepperの更新
    dispatch(changeState({ ...selectStep, stepIndex: 2 }))
    router.push('/menu')
  }

  return (
    <div className=" mt-3 flex w-full flex-col justify-start pt-3">
      <form
        className="mb-4 flex flex-col rounded bg-gray-100 px-8 pt-6 pb-8 shadow-md"
        onSubmit={handleSubmit(orderSubmit)}
        id="clientForm"
      >
        {/* 郵便番号 */}
        <div className="flex-roxw mb-4 flex max-h-[100px]">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="zipcode"
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(
                updateInfo({
                  ...clientInfoSelector,
                  zipcode: event.target.value,
                })
              )
            }}
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
        <div className="flex flex-col">
          {/* 都道府県 */}
          <div className="mb-4 mr-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="prefectures"
            >
              都道府県
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="prefectures"
              type="text"
              placeholder="青森"
              value={clientInfoSelector.prefectures}
              {...register('prefectures')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(
                  updateInfo({
                    ...clientInfoSelector,
                    prefectures: event.target.value,
                  })
                )
              }}
            />
          </div>
          <p className="mb-4 font-bold text-red-500">
            {errors.prefectures?.message}
          </p>
          {/* 市町村 */}
          <div className="mb-4 ml-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="municipalities"
            >
              市区町村
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="municipalities"
              type="text"
              placeholder="○○市"
              value={clientInfoSelector.municipalities}
              {...register('municipalities')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(
                  updateInfo({
                    ...clientInfoSelector,
                    municipalities: event.target.value,
                  })
                )
              }}
            />
          </div>
          <p className="mb-4 font-bold text-red-500">
            {errors.municipalities?.message}
          </p>
          {/* 番地・建物 */}
          <div className="mb-4 ml-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="addressBuilding"
            >
              番地・建物
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              type="text"
              id="addressBuilding"
              placeholder="番地・建物"
              value={clientInfoSelector.addressBuilding}
              {...register('addressBuilding')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(
                  updateInfo({
                    ...clientInfoSelector,
                    addressBuilding: event.target.value,
                  })
                )
              }}
            />
          </div>
          <p className="mb-4 font-bold text-red-500">
            {errors.addressBuilding?.message}
          </p>
          {/* 会社名 */}
          <div className="mb-4 ml-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="clientName"
            >
              会社名・お客様名
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              type="text"
              id="clientName"
              placeholder="会社名・お客様名"
              value={clientInfoSelector.clientName}
              {...register('clientName')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(
                  updateInfo({
                    ...clientInfoSelector,
                    clientName: event.target.value,
                  })
                )
              }}
            />
          </div>
          <p className="mb-4 font-bold text-red-500">
            {errors.clientName?.message}
          </p>
          {/* 連絡先 */}
          <div className="mb-4 ml-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="phoneNumber"
            >
              連絡先
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              type="text"
              id="phoneNumber"
              placeholder="連絡先"
              value={clientInfoSelector.phoneNumber}
              {...register('phoneNumber')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(
                  updateInfo({
                    ...clientInfoSelector,
                    phoneNumber: event.target.value,
                  })
                )
              }}
            />
          </div>
          <p className="mb-4 font-bold text-red-500">
            {errors.phoneNumber?.message}
          </p>
          {/* 配達日時 */}
          <div className="mb-4 ml-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="deliveryDate"
            >
              配達日時
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              type="date"
              id="deliveryDate"
              placeholder="配達日時"
              value={clientInfoSelector.deliveryDate}
              {...register('deliveryDate')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(
                  updateInfo({
                    ...clientInfoSelector,
                    deliveryDate: event.target.value,
                  })
                )
              }}
            />
          </div>
          <p className="mb-4 font-bold text-red-500">
            {errors.deliveryDate?.message}
          </p>
          {/* 受取時間 */}
          <div className="mb-4 ml-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="deliveryTime"
            >
              受取時間
            </label>
            <select
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="deliveryTime"
              placeholder="受取時間"
              value={clientInfoSelector.deliveryTime}
              {...register('deliveryTime')}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                dispatch(
                  updateInfo({
                    ...clientInfoSelector,
                    deliveryTime: event.target.value,
                  })
                )
              }}
            >
              {deliveryTimes.map((item) => (
                <option value={item.value} key={item.id}>
                  {item.state && item.value.replaceAll(/"/g, '')}
                </option>
              ))}
            </select>
          </div>
          <p className="mb-4 font-bold text-red-500">
            {errors.deliveryTime?.message}
          </p>
        </div>

        <div className="flex items-center justify-center">
          <input
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
            type="submit"
            form="clientForm"
            value="注文を確定へ進む"
          />
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
            type="button"
            onClick={toMenuPage}
          >
            注文登録へ戻る
          </button>
        </div>
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
