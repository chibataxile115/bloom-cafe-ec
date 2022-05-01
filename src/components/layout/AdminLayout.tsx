import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
// React icons
import { GrUserAdmin } from 'react-icons/gr'
import { GiBowlOfRice } from 'react-icons/gi'
import { CgLogOut } from 'react-icons/cg'
import { MdDashboard } from 'react-icons/md'
import { BsCalendarDate } from 'react-icons/bs'
// NOTE: Firebase関連
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { Auth, DB } from '../../firebase/firebaseConfig'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import { selectUser, signin, signout } from '../../redux/features/userSlice'

interface Props {
  children: React.ReactNode
  tabTitle: string
  pageTitle: string
}

const paths = {
  menueListAllMenue: '/admin/menue-list/all-menue',
  menueListByRank: '/admin/menue-list/by-rank',
  menueListByCategory: '/admin/menue-list/by-category',
  calendar: '/admin/calendar',
}

const AdminLayout: React.FC<Props> = (props) => {
  const { children, tabTitle, pageTitle } = props

  const dispatch = useAppDispatch()
  const userSelector = useAppSelector(selectUser)

  const router = useRouter()

  useEffect(() => {
    const unSub = onAuthStateChanged(Auth, async (authUser) => {
      if (authUser) {
        const pathName = router.pathname
        // ログイン済みのユーザー情報があるかチェック
        const userRef = doc(DB, 'admin', authUser.uid)
        const userDoc = await getDoc(userRef)

        if (!userDoc.exists()) {
          // Firestoreにユーザー情報のドキュメントが無ければ新規作成
          await setDoc(userRef, {
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          })

          dispatch(signin({ liffID: '', userName: '', uuid: authUser.uid }))
        } else {
          dispatch(signin({ liffID: '', userName: '', uuid: authUser.uid }))
        }
      } else {
        router.push('/signin')
      }
    })

    return () => {
      unSub()
    }
  }, [dispatch])

  const signoutSubmit = async () => {
    await signOut(Auth).then(() => {
      dispatch(signout())
    })
  }

  return (
    <div className="flex h-screen overflow-hidden rounded-md bg-white">
      <Head>
        <title>{tabTitle}</title>
      </Head>
      <div className="hidden duration-150 md:flex xl:flex-shrink-0">
        <div className="flex flex-col duration-150 md:w-24 xl:w-64">
          <div className="flex flex-grow flex-col overflow-y-auto border-r bg-black bg-opacity-80 pt-5">
            {/* サイドバーの各要素を配置 */}
            <div className="flex flex-shrink-0 flex-col items-center px-4">
              <Link href={paths.menueListAllMenue}>
                <button
                  className="
                  hidden
                  xl:block
                  xl:transform
                  xl:cursor-pointer
                  xl:p-2
                  xl:text-xl
                  xl:font-medium
                  xl:tracking-tighter
                  xl:text-gray-100
                  xl:transition
                  xl:duration-500
                  xl:ease-in-out
                  xl:hover:text-gray-100"
                >
                  管理画面
                </button>
              </Link>
              <button className="focus:shadow-outline hidden rounded-lg focus:outline-none">
                <GrUserAdmin className="text-gray-100" />
              </button>
            </div>

            {/* NOTE: メニューボタン */}
            <div className="flex flex-grow flex-col px-4 xl:mt-2">
              <nav className="flex-1 space-y-1 bg-transparent">
                <ul>
                  {/* NOTE: ダッシュボード */}
                  <li>
                    <Link href={paths.menueListAllMenue}>
                      <button
                        className="admin-side-btn"
                        // onClick={() => styleChange('dashboard')}
                      >
                        <div className="admin-side-menue-icon text-3xl">
                          <MdDashboard />
                        </div>
                        <div className="hidden xl:flex">
                          <span className="admin-side-menu-txt">
                            ダッシュボード
                          </span>
                        </div>
                      </button>
                    </Link>
                  </li>
                </ul>
                {/* NOTE: 商品/サブタイトル */}
                <div className="hidden xl:flex">
                  <p className="px-4 pt-4 font-medium uppercase text-gray-100">
                    商品
                  </p>
                </div>

                <ul>
                  {/* NOTE: 商品/商品一覧 */}
                  <li>
                    <Link href={paths.menueListAllMenue}>
                      <button
                        className="admin-side-btn"
                        onClick={() => router.push(paths.menueListAllMenue)}
                      >
                        <div className="admin-side-menue-icon text-3xl">
                          <GiBowlOfRice />
                        </div>
                        <div className="hidden xl:flex">
                          <div className="admin-side-menu-txt">
                            <span className="ml-4">商品一覧</span>
                          </div>
                        </div>
                      </button>
                    </Link>
                  </li>
                </ul>

                {/* NOTE: スケジュール/サブタイトル */}
                <div className="hidden xl:flex">
                  <p className="px-4 pt-4 font-medium uppercase text-gray-100">
                    スケジュール
                  </p>
                </div>

                <ul>
                  {/* NOTE: スケジュール/カレンダー */}
                  <li>
                    <Link href={paths.calendar}>
                      <button
                        className="admin-side-btn"
                        onClick={() => router.push(paths.calendar)}
                      >
                        <div className="admin-side-menue-icon text-3xl">
                          <BsCalendarDate />
                        </div>
                        <div className="hidden xl:flex">
                          <div className="admin-side-menue-txt">
                            <span className="ml-4">カレンダー</span>
                          </div>
                        </div>
                      </button>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* NOTE: サイドフッター/ログアウト */}
            <div className="flex flex-shrink-0 bg-gray-900 p-4 px-4">
              <Link href="/signin">
                <button
                  className="group block w-full flex-shrink-0"
                  onClick={signoutSubmit}
                >
                  <div className="flex items-center">
                    <div className="text-3xl text-gray-100 xl:items-center xl:justify-center">
                      <CgLogOut />
                    </div>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* NOTE: メインページ */}
      <div className="flex w-0 flex-1 flex-col overflow-hidden bg-gray-100">
        {/* <h1 className="text-lg text-neutral-600">{pageTitle}</h1> */}

        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          <div className="py-0 px-0">
            <div className="mx-auto flex max-w-full flex-grow px-0 sm:px-6 md:px-8">
              <h1 className="mt-4 flex-grow content-between text-3xl font-bold text-gray-900">
                {pageTitle}
              </h1>
            </div>
            <div className="mx-auto max-w-full px-4 sm:px-6 md:px-8">
              {/* <!-- Put your content here --> */}
              <div className="py-4">
                <div className="h-full rounded-lg bg-gray-100">{children}</div>
              </div>
              {/* <!-- Do not cross the closing tag underneath this coment--> */}
            </div>
          </div>
        </main>

        <footer className="bg-white" aria-labelledby="footer-heading">
          {/* <h2 id="footer-heading" className="sr-only">
            Footer
          </h2> */}
          <div className="mx-auto w-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-16">
            <div className="flex flex-wrap items-baseline lg:justify-center">
              <span className="mt-2 text-sm font-light text-gray-500">
                Copyright © 2022
                <Link href="https://wickedlabs.dev">
                  <a
                    className="text-red mx-2 hover:text-gray-500"
                    rel="noopener noreferrer"
                  >
                    @bloom cafe
                  </a>
                </Link>
                . Since 2022
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default AdminLayout
