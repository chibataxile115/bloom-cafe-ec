// types
import { SubmitMenue } from '../../../../types/types'
// Originals
import { UploadImage, SubmitMenueArgs } from '../../../../types/types'
import { AdminBasicModal } from '../'
import { ImageDropArea } from '../../dnd'
import { Spinner, SnackBar } from '../../../atoms'
import { useSubmitMenue } from '../../../../hooks/menue/useSubmitMenue'
import { MenueIDList } from '../../../../lib/MenueIDList'
// Loading
import Loader from 'react-loader-spinner'
// バリデーション関連
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { MenuSubmitFormSchema } from '../../../../lib'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../../../redux/app/hooks'
import {
  selectAdminPage,
  changeState as changeStateForAdminPage,
} from '../../../../redux/features/adminPageSlice'
import {
  selectUploadImages,
  resetImages,
} from '../../../../redux/features/menue/uploadImagesSlice'
import { selectSnackBar } from '../../../../redux/features/snackbar/snackbarSlice'

const MenueSubmitModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const adminPageSelector = useAppSelector(selectAdminPage)
  const uploadImagesSelector = useAppSelector(selectUploadImages)
  const snackBarSelector = useAppSelector(selectSnackBar)

  const maxImagesUpload = 3
  const leftMenueIDs = MenueIDList('left')
  const rightMenueIDs = MenueIDList('right')

  // NOTE: Validation
  const menuRegistFormSchema = MenuSubmitFormSchema()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubmitMenue>({
    mode: 'onChange',
    criteriaMode: 'all',
    resolver: yupResolver(menuRegistFormSchema),
  })

  const { submitMenue } = useSubmitMenue()

  const menueSubmit: SubmitHandler<SubmitMenue> = async (data) => {
    // ローディングON
    dispatch(
      changeStateForAdminPage({
        ...adminPageSelector,
        isMenueSubmitLoading: true,
      })
    )

    if (uploadImagesSelector.length !== 0) {
      const uploadImage: UploadImage[] = []
      uploadImagesSelector.forEach((item) => {
        uploadImage.push(item)
      })
      const meneSubmintDetail = {
        name: data.name,
        plice: data.plice,
        category: data.category,
        menueIDL: data.menueIDL,
        menueIDR: data.menueIDR,
        description: data.description,
      }
      const submitMenueArgs: SubmitMenueArgs = {
        uploadImages: uploadImage,
        menueDetail: meneSubmintDetail,
      }

      await submitMenue(submitMenueArgs)

      reset({
        name: '',
        plice: '',
        category: '',
        menueIDL: '',
        menueIDR: '',
        description: '',
      })
    }
  }

  const handleModalClose = () => {
    reset({
      name: '',
      plice: '',
      category: '',
      menueIDL: '',
      menueIDR: '',
    })

    dispatch(
      changeStateForAdminPage({
        ...adminPageSelector,
        isMenueSubmitModal: false,
        isMenueSubmitLoading: false,
      })
    )
    dispatch(resetImages())
  }

  return (
    <AdminBasicModal isOpenModal={adminPageSelector.isMenueSubmitModal}>
      <div className="flex flex-col justify-center">
        <div className="relative flex items-center justify-center">
          <h1 className="items-center justify-center text-center text-2xl font-bold">
            {adminPageSelector.isMenueSubmitLoading
              ? 'メニュー登録中・・・'
              : 'メニュー登録'}
          </h1>

          {/* Modal content */}
          {!adminPageSelector.isMenueSubmitLoading && (
            <div className="absolute right-0 p-2">
              <button
                type="button"
                className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="authentication-modal"
                onClick={handleModalClose}
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          )}
        </div>

        <div
          className="
            my-5
            flex
            w-full
            justify-center
            "
        >
          {adminPageSelector.isMenueSubmitLoading ? (
            <Spinner />
          ) : (
            <form
              className="mb-4 rounded bg-gray-100 px-8 pt-6 pb-8 shadow-md"
              onSubmit={handleSubmit(menueSubmit)}
            >
              {/* 商品名 */}
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="menue"
                >
                  商品名
                </label>
                <input
                  className="
                  focus:shadow-outline
                  w-full appearance-none rounded
                  border py-2
                  px-3
                  leading-tight
                  text-gray-700
                  shadow
                  "
                  id="menue"
                  type="text"
                  placeholder="サンドイッチ"
                  {...register('name')}
                />
              </div>

              <p className="mb-4 font-bold text-red-500">
                {errors.name?.message}
              </p>

              <div className="flex flex-row">
                {/* 金額 */}
                <div className="mb-4 mr-2">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor="plice"
                  >
                    金額(円)
                  </label>
                  <input
                    className="
                    focus:shadow-outline
                    w-full appearance-none rounded
                    border py-2
                    px-3
                    leading-tight
                    text-gray-700
                    shadow
                    "
                    id="plice"
                    type="text"
                    placeholder="300"
                    {...register('plice')}
                  />
                </div>
                {/* カテゴリー */}
                <div className="mb-4 ml-2">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor="category"
                  >
                    カテゴリー
                  </label>
                  <input
                    className="
                    focus:shadow-outline
                    w-full appearance-none rounded
                    border py-2
                    px-3
                    leading-tight
                    text-gray-700
                    shadow
                    "
                    id="category"
                    type="text"
                    placeholder="弁当"
                    {...register('category')}
                  />
                </div>
              </div>
              <p className="mb-4 font-bold text-red-500">
                {errors.plice?.message}
              </p>
              <p className="mb-4 font-bold text-red-500">
                {errors.category?.message}
              </p>

              <div className="mb-4 flex flex-col">
                {/* 商品ID */}
                <div>
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700"
                    htmlFor="menueID-left"
                  >
                    商品ID(○○○ - ○○○)
                  </label>
                </div>

                <div className="flex flex-row justify-between">
                  <div className="mr-2 w-full">
                    <select
                      defaultValue="選択して下さい"
                      className="
                      focus:shadow-outline
                      w-full
                      rounded border
                      py-2 px-3
                      leading-tight
                      text-gray-700 shadow
                      "
                      name="menueID-left"
                      {...register('menueIDL')}
                    >
                      <option value="">選択して下さい</option>
                      {leftMenueIDs.map((item) => (
                        <option key={item.id} value={item.value}>
                          {item.value.replaceAll(/"/g, '')}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="items-center">
                    <h3 className="font-mono text-4xl"> - </h3>
                  </div>

                  <div className="ml-2 w-full">
                    <select
                      defaultValue="選択して下さい"
                      className="
                      focus:shadow-outline
                      w-full
                      rounded border
                      py-2 px-3
                      leading-tight
                      text-gray-700 shadow
                      "
                      name="menueID-right"
                      {...register('menueIDR')}
                    >
                      <option value="">選択して下さい</option>
                      {rightMenueIDs.map((item) => (
                        <option key={item.id} value={item.value}>
                          {item.value.replaceAll(/"/g, '')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <p className="mb-4 font-bold text-red-500">
                {errors.menueIDL?.message}
              </p>
              <p className="mb-4 font-bold text-red-500">
                {errors.menueIDR?.message}
              </p>

              {/* 商品説明 */}
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="menu-description"
                >
                  商品説明
                </label>
                <textarea
                  className="
                  focus:shadow-outline
                  w-full appearance-none rounded
                  border py-2
                  px-3
                  leading-tight
                  text-gray-700
                  shadow
                  "
                  id="menu-description"
                  cols={35}
                  rows={5}
                  placeholder="おすすめ商品です！！"
                  {...register('description')}
                ></textarea>
                <p className="mb-4 font-bold text-red-500">
                  {errors.description?.message}
                </p>
              </div>

              {/* 写真 */}
              <div className="mb-6">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="image"
                >
                  写真
                </label>
                <ImageDropArea maxImagesUpload={maxImagesUpload} />
              </div>

              <div className="flex items-center justify-center">
                <button
                  className="
                  focus:shadow-outline
                  w-4/12 min-w-[150px]
                  rounded
                  bg-blue-400 py-2 px-4
                  font-bold
                  text-white
                  hover:bg-blue-500
                  disabled:bg-gray-300 disabled:text-gray-400
                  "
                  disabled={uploadImagesSelector.length === 0}
                  type="submit"
                >
                  メニューを登録
                </button>
              </div>
            </form>
          )}

          {/* スナックバー */}
          <SnackBar
            message={
              snackBarSelector.mode === 'success'
                ? '登録が完了しました！'
                : '登録に失敗しました。もう一度お試し下さい。'
            }
            isOpen={snackBarSelector.isOpenTheMenueRegistSnackbar}
            mode={snackBarSelector.mode}
          />
        </div>
      </div>
    </AdminBasicModal>
  )
}

export default MenueSubmitModal
