import Image from 'next/image'
// originals
import { ImageLoader } from '../../../../lib'
// Custom Hook
import { useFetchSubImages } from '../../../../hooks/menue/useFetchSubImages'
// types
import { AdminMenueDetail } from '../../../../types/types'
// Redux関連
import { useAppDispatch, useAppSelector } from '../../../../redux/app/hooks'
import {
  selectAdminPage,
  changeState as changeStateForAdminPage,
} from '../../../../redux/features/adminPageSlice'
import {
  selectMenueList,
  resetMenue as resetMenueForMenueList,
} from '../../../../redux/features/menue/menueListSlice'
import {
  selectAdminMenueDetail,
  changeState as changeStateForAdminMenueDetailModal,
} from '../../../../redux/features/menue/admin/adminMenueDetailSlice'
import { resetImages } from '../../../../redux/features/menue/subImagesSlice'

interface Props {
  targetCategory: string
}

const ByCategoryMenueView: React.FC<Props> = (props) => {
  const { targetCategory } = props

  const dispatch = useAppDispatch()
  const adminPageSelector = useAppSelector(selectAdminPage)
  const menueListSelector = useAppSelector(selectMenueList)
  const adminMenueDetailSelector = useAppSelector(selectAdminMenueDetail)

  const { getSubImages } = useFetchSubImages()

  const openDetails = (menueDetailData: AdminMenueDetail) => {
    const { docID, id, name, category, count, imageURL, plice } =
      menueDetailData

    dispatch(resetImages())

    dispatch(
      changeStateForAdminMenueDetailModal({
        ...adminMenueDetailSelector,
        docID: docID,
        id: id,
        name: name,
        category: category,
        count: count,
        imageURL: imageURL,
        plice: plice,
      })
    )
    getSubImages(docID)
    dispatch(
      changeStateForAdminPage({
        ...adminPageSelector,
        isMenueDetailModal: true,
      })
    )
  }

  return (
    <ul className="flex flex-wrap">
      {menueListSelector.map((item) => {
        if (item.category === targetCategory) {
          return (
            <li
              key={item.id}
              onClick={() =>
                openDetails({
                  docID: item.docID,
                  id: item.id,
                  name: item.name,
                  category: item.category,
                  count: item.count,
                  imageURL: item.imageURL,
                  plice: item.plice,
                })
              }
            >
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
                    loader={() => ImageLoader()}
                    src={ImageLoader(item.imageURL, 190)}
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
          )
        }
      })}
    </ul>
  )
}

export default ByCategoryMenueView
