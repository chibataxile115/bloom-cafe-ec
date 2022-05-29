import { useState } from 'react'
import { useRouter } from 'next/router'
import { AuthLayout } from '../layout/AuthLayout'
import { AuthLoadingLayout } from '../layout/AuthLoadingLayout'
// バリデーション関連
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// Originals
import { Spinner } from '../atoms'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import { selectAuthPage, changeState } from '../../redux/features/authPageSlice'
// Firebase
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Auth } from '../../firebase/firebaseConfig'

// 認証フォーム用のバリデーションスキーマ(データ構造)
export const AuthSchema = yup
  // .object()
  .object({
    email: yup
      .string()
      .required('メールアドレスは必須項目です。')
      // .lowercase()
      .email('正しいメールアドレスを入力してください。'),
    password: yup
      .string()
      .required('パスワードは必須項目です。')
      .matches(/(?=.*[a-z])/, '小文字を含めてください。')
      // .matches(/(?=.*[A-Z])/, "大文字を含めてください")
      .matches(/(?=.*[0-9])/, '数字を含めてください。')
      .min(8, '最低８文字含めてください。'),
  })
  .required()

// 入力フォームの型
interface FormValues {
  email: string
  password: string
}

const SigninBase: React.FC = () => {
  const dispatch = useAppDispatch()
  const authPageSelector = useAppSelector(selectAuthPage)

  const router = useRouter()

  const toggleShowPassword = () => {
    dispatch(
      changeState({
        ...authPageSelector,
        showPassword: !authPageSelector.showPassword,
      })
    )
  }

  // NOTE: Validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    criteriaMode: 'all',
    resolver: yupResolver(AuthSchema),
  })

  // NOTE: メールサインイン
  const signinSubmit: SubmitHandler<FormValues> = async (data) => {
    // ローディングを起動
    dispatch(changeState({ ...authPageSelector, isLoading: true }))

    // サインイン処理
    await signInWithEmailAndPassword(Auth, data.email, data.password)
      .then((result) => {
        // ローディングを停止
        dispatch(changeState({ ...authPageSelector, isLoading: false }))

        router.push('/admin/menue-list')
      })
      .catch((error) => {
        // ローディングを停止
        dispatch(changeState({ ...authPageSelector, isLoading: false }))
        alert(`サインインに失敗しました。\n${error.message}`)
      })
  }

  // 認証中のローディング
  if (authPageSelector.isLoading) {
    return (
      <AuthLoadingLayout tabTitle="処理中">
        <div className="flex min-h-screen w-full flex-col items-center justify-center">
          <p className="mt-0 mb-5 text-2xl">認証処理中です・・・</p>
          <Spinner />
        </div>
      </AuthLoadingLayout>
    )
  }

  return (
    <AuthLayout tabTitle="サインイン" pageTitle="管理者ログイン">
      <form className="space-y-6" onSubmit={handleSubmit(signinSubmit)}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            メールアドレス
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="text"
              // autoComplete="email"
              // required
              placeholder="sample@test.com"
              // onChange={emailChange}
              {...register('email')}
              className="
              block
              w-full
              transform
              rounded-lg
              border border-transparent
              bg-gray-100
              px-5
              py-3
              text-base
              text-gray-600
              placeholder-gray-300 transition
              duration-500
              ease-in-out
              focus:border-transparent
              focus:outline-none
              focus:ring-2
              focus:ring-white
              focus:ring-offset-2
              focus:ring-offset-gray-300
              "
            />
          </div>
          <p className="font-bold text-red-500">{errors.email?.message}</p>
        </div>
        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-neutral-600"
          >
            パスワード
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type={authPageSelector.showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              // required
              placeholder="8文字以上"
              // onChange={passwordChange}
              {...register('password')}
              className="
              block
              w-full
              transform
              rounded-lg
              border border-transparent
              bg-gray-100
              px-5
              py-3
              text-base
              text-neutral-600
              placeholder-gray-300 transition
              duration-500
              ease-in-out
              focus:border-transparent
              focus:outline-none
              focus:ring-2
              focus:ring-white
              focus:ring-offset-2
              focus:ring-offset-gray-300
              "
            />
          </div>
          <p className="font-bold text-red-500">{errors.password?.message}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="show-password"
              name="remember-me"
              type="checkbox"
              placeholder="Your password"
              onClick={toggleShowPassword}
              className="
              h-4
              w-4
              rounded
              border-gray-200
              text-blue-600
              focus:ring-blue-500
              "
            />
            <label
              htmlFor="show-password"
              className="ml-2 block text-sm text-neutral-600"
            >
              パスワードを表示
            </label>
          </div>

          <div className="text-sm">
            <button
              // href="#"
              // onClick={openThaResetPasswordModal}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              パスワードを忘れてしまいましたか?
            </button>
          </div>
        </div>

        <div>
          <input
            type="submit"
            value="サインイン"
            // onClick={handleSubmit(sumpleSubmit)}
            className="
            flex
            w-full
            transform
            items-center
            justify-center
            rounded-xl
            bg-blue-600
            px-10
            py-4 text-center
            text-base
            font-medium
            text-white
            transition
            duration-500
            ease-in-out
            hover:bg-blue-700
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:ring-offset-2
            "
          />
        </div>
      </form>
    </AuthLayout>
  )
}

export default SigninBase
