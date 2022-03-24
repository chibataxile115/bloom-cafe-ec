import { FC, ReactNode } from 'react'
import Head from 'next/head'
import { Steper } from '../atoms'

interface Props {
  children: ReactNode
  title:
    | 'ようこそ'
    | '商品一覧'
    | '商品詳細'
    | '注文確認'
    | '入力フォーム'
    | 'カート'
}

const HomeLayout: FC<Props> = (props) => {
  const { children, title } = props

  return (
    <div
      className="
    flex min-h-screen flex-col
    items-center
    justify-center
    bg-gray-500
    bg-cover
    "
    >
      <Head>
        <title>{title}</title>
      </Head>
      <div className="bg-gradient-to-r "></div>
      <header className="mt-10 min-w-full">
        <Steper />
      </header>

      <main className="flex w-screen flex-1 flex-col items-center">
        {children}
      </main>
      <footer className="flex h-12 w-full items-center justify-center border-t ">
        {/* FIXME: 文字色を修正 */}
        <a
          className="flex items-center text-black"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          bloom{' '}
        </a>
      </footer>
    </div>
  )
}

export default HomeLayout
