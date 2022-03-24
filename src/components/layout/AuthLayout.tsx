import Head from 'next/head'

interface Props {
  children: React.ReactNode
  tabTitle: string
  pageTitle: string
}

export const AuthLayout: React.FC<Props> = (props) => {
  const { children, tabTitle, pageTitle } = props

  return (
    <div
      className="
      mx-auto my-0 flex min-h-screen
      w-full
      max-w-md
      transform
      flex-col
      justify-center
      rounded-lg
      bg-white
      p-0
      text-gray-700
      transition
      duration-500
      ease-in-out"
    >
      <Head>
        <title>{tabTitle}</title>
      </Head>
      <header className="mt-0 mb-10 min-w-full">
        <div className="mt-0 flex justify-center">
          <p className="text-4xl font-bold text-gray-700">{pageTitle}</p>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
