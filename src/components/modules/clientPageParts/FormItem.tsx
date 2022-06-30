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
// Originals
import { ArrowButton } from '../../atoms/button'

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
    mode: 'onChange',
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
    <div className=" mt-3 flex max-w-[95%] flex-col justify-start pt-3">
      <form
        className="mb-4 flex flex-col rounded bg-gray-200 px-8 pt-6 pb-8 shadow-md"
        onSubmit={handleSubmit(orderSubmit)}
        id="clientForm"
      >
        {/* 郵便番号 */}
        <div className="mb-6 ml-2 flex max-h-[100px] flex-col">
          <label
            className="mb-2 block text-sm  font-bold text-gray-700"
            htmlFor="zipcode"
          >
            郵便番号
          </label>
          <div className="flex justify-between">
            <input
              className="w-[65%] appearance-none rounded border py-2 px-2 leading-tight text-gray-700 shadow outline-black focus:outline"
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
              className="ml-4 w-[30%] rounded bg-gray-400  leading-tight text-white outline-black"
              type="button"
              onClick={handleFetchFromZipcode}
            >
              住所検索
            </button>
          </div>
          <p className="text-red-500">{errors.zipcode?.message}</p>
        </div>
        {/* 都道府県 */}
        <div className="mb-6 ml-2 flex max-h-[100px] flex-col">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="prefectures"
          >
            都道府県
          </label>
          <input
            className="w-full appearance-none rounded border py-2 px-2 leading-tight text-gray-700 shadow outline-black focus:outline"
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
          <p className="text-red-500">{errors.prefectures?.message}</p>
        </div>
        {/* 市町村 */}
        <div className="mb-6 ml-2 flex max-h-[100px] flex-col">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="municipalities"
          >
            市区町村
          </label>
          <input
            className="w-full appearance-none rounded border py-2 px-2 leading-tight text-gray-700 shadow outline-black focus:outline"
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
          <p className="text-red-500">{errors.municipalities?.message}</p>
        </div>
        {/* 番地・建物 */}
        <div className="mb-6 ml-2 flex max-h-[100px] flex-col">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="addressBuilding"
          >
            番地・建物
          </label>
          <input
            className="w-full appearance-none rounded border py-2 px-2 leading-tight text-gray-700 shadow outline-black focus:outline"
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
          <p className="text-red-500">{errors.addressBuilding?.message}</p>
        </div>
        {/* 会社名 */}
        <div className="mb-6 ml-2 flex max-h-[100px] flex-col">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="clientName"
          >
            会社名・お客様名
          </label>
          <input
            className="w-full appearance-none rounded border py-2 px-2 leading-tight text-gray-700 shadow outline-black focus:outline"
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
          <p className="text-red-500">{errors.clientName?.message}</p>
        </div>
        {/* 連絡先 */}
        <div className="mb-6 ml-2 flex max-h-[100px] flex-col">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="phoneNumber"
          >
            連絡先
          </label>
          <input
            className="w-full appearance-none rounded border py-2 px-2 leading-tight text-gray-700 shadow outline-black focus:outline"
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
          <p className="text-red-500">{errors.phoneNumber?.message}</p>
        </div>
        {/* 配達日 */}
        <div className="mb-6 ml-2 flex max-h-[100px] flex-col">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="deliveryDate"
          >
            配達日
          </label>
          <input
            className="w-full appearance-none rounded border py-2 px-2 leading-tight text-gray-700 shadow outline-black focus:outline"
            type="date"
            id="deliveryDate"
            placeholder="配達日"
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
          <p className="text-red-500">{errors.deliveryDate?.message}</p>
        </div>
        {/* 受取時間 */}
        <div className="mb-6 ml-2 flex max-h-[100px] flex-col">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="deliveryTime"
          >
            受取時間
          </label>
          <select
            className="w-full appearance-none rounded border py-2 px-2 leading-tight text-gray-700 shadow outline-black focus:outline"
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
          <p className="text-red-500">{errors.deliveryTime?.message}</p>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="ml-10 rounded-full bg-white p-2 shadow-lg outline-black"
            type="button"
            onClick={toMenuPage}
          >
            <ArrowButton ClassName="h-12 w-12" direction="left" />
          </button>
          <button
            className="mr-10 rounded-full bg-white p-2 shadow-lg outline-black"
            type="submit"
            form="clientForm"
          >
            <ArrowButton ClassName="h-12 w-12" direction="right" />
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
