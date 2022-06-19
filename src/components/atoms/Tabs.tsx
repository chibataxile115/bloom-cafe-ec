import Link from 'next/link'
import clsx from 'clsx'

interface Props {
  children: React.ReactNode
  currentTabTitle: 'すべて' | 'カテゴリー順' | '人気順'
}
type TabContents = {
  title: 'すべて' | 'カテゴリー順' | '人気順'
  href: string
}

const Tabs: React.FC<Props> = (props) => {
  const { children, currentTabTitle } = props

  const tabContents: TabContents[] = [
    { title: 'すべて', href: '/admin/menu-list/all-menu' },
    { title: 'カテゴリー順', href: '/admin/menu-list/by-category' },
    { title: '人気順', href: '/admin/menu-list/by-rank' },
  ]

  return (
    <div>
      <ul
        className="
        flex flex-wrap
        border-b border-black border-opacity-70
        text-center text-sm font-medium
        text-gray-500
        "
      >
        {tabContents.map((item, index) => (
          <li key={index} className="mr-2">
            <Link href={item.href}>
              <a
                aria-current="page"
                className={clsx(
                  `
                  inline-block
                  rounded-t-lg
                  `,
                  currentTabTitle === item.title
                    ? `bg-black bg-opacity-70 p-4 text-gray-100`
                    : `p-4 hover:bg-black hover:bg-opacity-70 hover:text-gray-100`
                )}
              >
                {item.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </div>
  )
}

export default Tabs
