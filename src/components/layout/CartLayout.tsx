import { FC, ReactNode } from 'react'
import Head from 'next/head'

interface Props {
  children: ReactNode
  title: 'カート'
}

const CartLayout: FC<Props> = (props) => {
  const { children, title } = props

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="flex w-screen flex-1 flex-col items-center">
        {children}
      </main>
    </div>
  )
}

export default CartLayout
