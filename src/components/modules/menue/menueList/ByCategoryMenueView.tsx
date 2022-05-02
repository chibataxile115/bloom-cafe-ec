import Image from 'next/image'
// Redux関連
import { useAppSelector } from '../../../../redux/app/hooks'
import { selectMenueList } from '../../../../redux/features/menue/menueListSlice'

interface Props {
  targetCategory: string
}

const ByCategoryMenueView: React.FC<Props> = (props) => {
  const { targetCategory } = props

  const menueListSelector = useAppSelector(selectMenueList)

  const myLoader = (src?: string, width?: number, quality?: number) => {
    const url = `${src}?w=${width}&q=${quality || 75}`
    return url
  }

  return (
    <ul className="flex flex-wrap">
      {menueListSelector.map((item) => {
        if (item.category === targetCategory) {
          return (
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
          )
        }
      })}
    </ul>
  )
}

export default ByCategoryMenueView
