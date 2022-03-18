import React, { useState } from 'react'
// NOTE: Firebase関連
import { DB, Storage } from '../../firebase/firebaseConfig'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import {
  collection,
  doc,
  addDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore'

const AdminBase: React.VFC = () => {
  const [selectImage, setSelectImage] = useState<File | null>(null)
  const [uniqueImage, setUniqueImage] = useState('')

  const [name, setName] = useState('')
  const [plice, setPlice] = useState(0)

  const onChangeImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files![0]) {
      setSelectImage(event.target.files![0])
      event.target.value = ''
    }
  }

  const uploadImage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (selectImage) {
      // この文字列の中からランダム生成する
      const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      // 生成する文字数
      const N = 16
      const randomStr = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join('')
      const processedImageName = randomStr + '_' + selectImage.name

      setUniqueImage(processedImageName)

      const uploadImage = uploadBytesResumable(
        ref(Storage, `images/${uniqueImage}`),
        selectImage
      )

      uploadImage.on(
        'state_changed',
        () => {},
        (err) => {
          alert(err.message)
        },
        async () => {
          //Firebase ver9 compliant
          await getDownloadURL(ref(Storage, `images/${uniqueImage}`)).then(
            async (url) => {
              await addDoc(collection(DB, 'menues'), {
                id: uniqueImage,
                imageURL: url,
                plice: plice,
                name: name,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
              })
              // useStateを初期化
              // setSelectImage(null)
              // setUniqueImage('')
              // setName('')
              // setPlice(0)
            }
          )
        }
      )
    }
  }

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-center text-2xl font-bold">管理画面</h1>

      {/*  */}
      <div className="w-full max-w-xs">
        <form
          className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
          onSubmit={uploadImage}
        >
          {/* 商品名 */}
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="name"
            >
              商品名
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="name"
              type="text"
              placeholder="サンドイッチ"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setName(event.target.value)
              }
            />
          </div>
          {/* 金額 */}
          <div className="mb-4">
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPlice(Number(event.target.value))
              }
            />
          </div>
          {/* 写真 */}
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="name"
            >
              写真
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="name"
              type="file"
              onChange={onChangeImageHandler}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="submit"
            >
              メニューを登録
            </button>
          </div>
        </form>
        <p className="text-center text-xs text-gray-500">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
      {/*  */}

      <p>{name}</p>
      <br />
      <p>{plice}</p>
      <br />
      <p>{selectImage ? selectImage.name : 'null'}</p>
      <br />
    </div>
  )
}

export default AdminBase
