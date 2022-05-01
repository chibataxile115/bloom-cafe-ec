import { useEffect } from 'react'
import Image from 'next/image'
// Originals
import { AdminLayout } from '../../../../layout'
import { MenueSubmitModal } from '../../../../modules/modal'
import { Tabs } from '../../../../atoms'
// Custom Hook
import { useFetchMenue } from '../../../../../hooks/menue/useFetchMenue'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../../../../redux/app/hooks'
import {
  selectAdminPage,
  changeState as changeStateForAdminPage,
} from '../../../../../redux/features/adminPageSlice'
import {
  selectMenueList,
  resetMenue as resetMenueForMenueList,
} from '../../../../../redux/features/menue/menueListSlice'

const AllMenueBase = () => {
  const dispatch = useAppDispatch()
  const adminPageSelector = useAppSelector(selectAdminPage)
  const menueListSelector = useAppSelector(selectMenueList)

  const { getMenueList } = useFetchMenue()

  useEffect(() => {
    if (menueListSelector.length !== 0) {
      dispatch(resetMenueForMenueList())
      getMenueList()
    } else {
      getMenueList()
    }
  }, [])

  const myLoader = (src?: string, width?: number, quality?: number) => {
    const url = `${src}?w=${width}&q=${quality || 75}`
    return url
  }

  return (
    <AdminLayout tabTitle="商品一覧" pageTitle="商品一覧">
      <button
        className="
        maw-h-[50px] max-w-[100px]
        rounded-md border-2
        border-blue-600 bg-blue-500
        px-2 py-2
        text-white
        focus:ring-2
        focus:ring-gray-700
        "
        onClick={() => {
          dispatch(
            changeStateForAdminPage({
              ...adminPageSelector,
              isMenueSubmitModal: true,
            })
          )
        }}
      >
        商品を登録
      </button>
      <div className="mt-5">
        <Tabs currentTabTitle={'すべて'}>
          <ul className="flex flex-wrap">
            {menueListSelector.map((item) => (
              <li key={item.id}>
                <div
                  className="
                  mt-4 mr-4 flex
                  flex-col
                  rounded-md
                  bg-white py-2 px-2
                  shadow-xl
                  "
                >
                  <div
                    className="
                    font-size-0 next-image-div m-0
                    h-full w-full rounded-md
                    border-[1px]
                    border-gray-400
                    p-0
                    "
                  >
                    <Image
                      loader={() => myLoader()}
                      src={myLoader(item.imageURL, 190)}
                      width={190}
                      height={190}
                      className="m-0 items-center justify-center rounded-md p-0"
                      unoptimized
                    />
                  </div>
                  <div
                    className="
                    mt-2 flex flex-col
                    border-l-4 border-blue-500
                    "
                  >
                    <p className="ml-2">{item.name}</p>
                    <p className="ml-2">{`${Math.round(
                      Number(item.plice) * 1.1
                    )}円 (税抜 : ${item.plice}円)`}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Tabs>
      </div>
      <MenueSubmitModal />
    </AdminLayout>
  )
}

export default AllMenueBase
