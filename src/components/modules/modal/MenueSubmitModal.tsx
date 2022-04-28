// types
import { SubmitMenue } from '../../../types/types'
// Originals
import { UploadImage, SubmitMenueArgs } from '../../../types/types'
import { BasicModal } from '.'
import { ImageDropArea } from '../dnd'
import { SnackBar } from '../../atoms'
import { useSubmitMenue } from '../../../hooks/menue/useSetMenue'
// Loading
import Loader from 'react-loader-spinner'
// バリデーション関連
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { MenueRegistFormSchema } from '../../../lib'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks'
import {
  selectAdminPage,
  changeState as changeStateForAdminPage,
} from '../../../redux/features/adminPageSlice'
import {
  selectUploadImages,
  resetImages,
} from '../../../redux/features/menue/uploadImagesSlice'
import { selectSnackBar } from '../../../redux/features/snackbar/snackbarSlice'

const MenueSubmitModal: React.FC = () => {
  const dispatch = useAppDispatch()
  const adminPageSelector = useAppSelector(selectAdminPage)
  const uploadImagesSelector = useAppSelector(selectUploadImages)
  const snackBarSelector = useAppSelector(selectSnackBar)

  const maxImagesUpload = 3

  // NOTE: Validation
  const menueRegistFormSchema = MenueRegistFormSchema()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubmitMenue>({
    mode: 'onChange',
    criteriaMode: 'all',
    resolver: yupResolver(menueRegistFormSchema),
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
      const meneRegistDetail = {
        name: data.name,
        plice: data.plice,
        category: data.category,
        menueIDL: data.menueIDL,
        menueIDR: data.menueIDR,
      }
      const submitMenueArgs: SubmitMenueArgs = {
        uploadImages: uploadImage,
        menueDetail: meneRegistDetail,
      }

      await submitMenue(submitMenueArgs)

      reset({
        name: '',
        plice: '',
        category: '',
        menueIDL: '',
        menueIDR: '',
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
    <BasicModal isOpenModal={adminPageSelector.isMenueSubmitModal}>
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
            <Loader
              type="Oval"
              color="#2563EB"
              height={70}
              width={70}
              timeout={5000} //3 secs
            />
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
                  className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
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
                    className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
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
                    className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
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
                      <option value="" selected>
                        選択して下さい
                      </option>
                      <option value="aaa">aaa</option>
                      <option value="aab">aab</option>
                      <option value="abb">abb</option>
                      <option value="bbb">bbb</option>
                      <option value="bbc">bbc</option>
                      <option value="bcc">bcc</option>
                      <option value="ccc">ccc</option>
                    </select>
                  </div>

                  <div className="items-center">
                    <h3 className="font-mono text-4xl"> - </h3>
                  </div>

                  <div className="ml-2 w-full">
                    <select
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
                      <option value="" selected>
                        選択して下さい
                      </option>
                      <option value="001">001</option>
                      <option value="002">002</option>
                      <option value="003">003</option>
                      <option value="011">011</option>
                      <option value="012">012</option>
                      <option value="013">013</option>
                      <option value="021">021</option>
                      <option value="022">022</option>
                      <option value="023">023</option>
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
                  w-4/12
                  min-w-[150px] rounded
                  bg-blue-400
                  py-2 px-4 font-bold
                  text-white
                  hover:bg-blue-500
                  focus:outline-none
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
    </BasicModal>
  )
}

export default MenueSubmitModal
