import { FC, ReactNode } from 'react'
import Head from 'next/head'
import { Steper } from '../atoms'
import Badge from '@mui/material/Badge'
// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import { selectStep, changeState } from '../../redux/features/step/stepSlice'
import { selectCartDetail } from '../../redux/features/cartdetailSlice'
import {
  selectStoringData,
  addOrder,
} from '../../redux/features/storingdateSlice'
import { selectMenueList } from '../../redux/features/menue/menueListSlice'

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

  const dispatch = useAppDispatch()
  const stepSelector = useAppSelector(selectStep)
  const cartDetailSelector = useAppSelector(selectCartDetail)
  const storingDataSelector = useAppSelector(selectStoringData)
  const menueListSelector = useAppSelector(selectMenueList)

  const openModal = () => {
    menueListSelector.map((item) => {
      if (item.isInCart) {
        dispatch(
          addOrder(
            item.docID,
            item.id,
            item.name,
            item.category,
            item.isInCart,
            item.count,
            item.imageURL,
            item.plice,
            item.isInit
          )
        )
      }
    })

    dispatch(
      changeState({
        ...stepSelector,
        isCartModal: true,
      })
    )
  }

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
        <span className="float-right" onClick={openModal}>
          <Badge
            color="secondary"
            overlap="circular"
            badgeContent={cartDetailSelector.cartdetailTotal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </Badge>
        </span>
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
