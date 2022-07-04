import { FC, ReactNode } from 'react'
import Head from 'next/head'
import { Stepper } from '../atoms'

interface Props {
  children: ReactNode
  title: 'ようこそ' | '商品選択' | 'お客様情報' | '注文内容'
}

const copyRights = [
  { url: 'https://instagram.com/super_takuto0115/', name: 'super_takuto0115' },
  { url: 'https://instagram.com/bo.yu__go/', name: 'bo.yu__go' },
]

const HomeLayout: FC<Props> = (props) => {
  const { children, title } = props

  return (
    <div
      className="
      flex min-h-screen w-full flex-col
      items-center
      justify-center
      bg-gray-200
      "
    >
      <Head>
        <title>{title}</title>
      </Head>
      <header className="min-w-full">
        <Stepper />
      </header>
      <main className="flex w-screen flex-1 flex-col items-center">
        {children}
      </main>
      <footer className="bottom-0 flex h-10 w-full items-center justify-center border-t border-white bg-gray-200">
        <a
          className="flex cursor-pointer items-center text-black"
          href={copyRights[0].url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {copyRights[0].name}
        </a>
        <p className="mx-2">/</p>
        <a
          className="flex cursor-pointer items-center text-black"
          href={copyRights[1].url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {copyRights[1].name}
        </a>
      </footer>
    </div>
  )
}

export default HomeLayout
