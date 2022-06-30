import React from 'react'
import Head from 'next/head'

interface Props {
  children: React.ReactNode
  title?: 'ありがとうございました'
}

const ThanksLayout: React.FC<Props> = (props) => {
  const { children, title = 'ありがとうございました' } = props

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
      <main className="flex w-screen flex-1 flex-col items-center">
        {children}
      </main>
      <footer className="bottom-0 flex h-10 w-full items-center justify-center border-t border-white bg-gray-200">
        <a
          className="flex items-center text-black"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          お弁当受付について{' '}
        </a>
      </footer>
    </div>
  )
}

export default ThanksLayout
