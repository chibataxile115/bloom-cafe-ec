import { useState, useCallback } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
// ドラッグ&ドロップ
import { useDropzone } from 'react-dropzone'
// Originals
import { SnackBar } from '../../atoms'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks'
import { selectMenueRegist } from '../../../redux/features/menue/menueRegistSlice'
import {
  selectUploadImages,
  addImage,
  resetImages,
} from '../../../redux/features/menue/uploadImagesSlice'
import {
  selectSnackBar,
  changeState as changeStateForSnackBar,
} from '../../../redux/features/snackbar/snackbarSlice'

interface Props {
  maxImagesUpload: number
}

const ImageDropArea: React.FC<Props> = (props) => {
  const { maxImagesUpload } = props

  const dispatch = useAppDispatch()
  const menueRegistSelector = useAppSelector(selectMenueRegist)
  const uploadImagesSelector = useAppSelector(selectUploadImages)
  const snackBarSelector = useAppSelector(selectSnackBar)

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (maxImagesUpload > uploadImagesSelector.length) {
        acceptedFiles.forEach(async (file: File) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            dispatch(addImage(file.name, URL.createObjectURL(file)))
          }
        })
      } else {
        dispatch(
          changeStateForSnackBar({
            ...snackBarSelector,
            isOpenTheImageUploadSnacbar: true,
            mode: 'error',
          })
        )
        setTimeout(() => {
          dispatch(
            changeStateForSnackBar({
              ...snackBarSelector,
              isOpenTheImageUploadSnacbar: false,
            })
          )
        }, 3000)
      }
    },
    [uploadImagesSelector]
  )

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
  })

  let borderBaseStyle =
    'flex flex-col justify-center items-center w-full h-60 border-4 bg-gray-50 relative cursor-default rounded-lg '
  const style = isDragActive
    ? borderBaseStyle + 'border-solid border-4 border-blue-400'
    : borderBaseStyle + 'border-dashed border-4 border-gray-400'

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={style}>
          <div
            className="
            absolute z-0 flex
            justify-center text-center
            text-9xl
            font-bold
            text-gray-200
            "
          >
            {uploadImagesSelector.length <= 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-60 w-60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            )}
          </div>
          {uploadImagesSelector.length <= 0 ? (
            <p
              className="
            z-10
            text-center text-lg
            font-bold
            text-gray-700
            "
            >
              ここにファイルをドロップ
              <br />
              または
            </p>
          ) : (
            <div className="mx-2 flex flex-row rounded-lg bg-gray-200 p-2">
              {uploadImagesSelector.map((image, index) => (
                <img
                  key={index}
                  src={image.imageURL}
                  className={clsx(
                    `
                    max-h-[100px] max-w-[300px] rounded-l
                    `,
                    uploadImagesSelector.length > 1 && `p-2`
                  )}
                />
              ))}
            </div>
          )}

          <div className="z-10 text-center">
            <button
              disabled={maxImagesUpload <= uploadImagesSelector.length}
              type="button"
              onClick={open}
              className={clsx(
                `
                mt-16 mb-0 min-w-[80px]
                cursor-pointer
                rounded bg-green-400 p-2
                text-gray-100
                hover:bg-green-500
                disabled:bg-gray-300 disabled:text-gray-400
                `,
                uploadImagesSelector.length > 0 && `mt-6`
              )}
            >
              {uploadImagesSelector.length <= 0 ? '画像を選択' : '画像を追加'}
            </button>

            {uploadImagesSelector.length > 0 && (
              <button
                type="button"
                onClick={() => dispatch(resetImages())}
                className={clsx(
                  `
                mt-16 mb-0 ml-5 min-w-[80px]
                cursor-pointer
                rounded bg-red-400 p-2
                text-gray-100
                hover:bg-red-500
                `,
                  uploadImagesSelector.length > 0 && `mt-6`
                )}
              >
                削除
              </button>
            )}
          </div>
        </div>
        {/* スナックバー */}
        <SnackBar
          message={'アップロードできる画像枚数の上限を超えています。'}
          isOpen={snackBarSelector.isOpenTheImageUploadSnacbar}
          mode={'error'}
        />
      </div>
    </div>
  )
}

export default ImageDropArea
