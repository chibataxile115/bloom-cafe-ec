import React from 'react'
import { useContext } from 'react'
import { useRouter } from 'next/router'

// NOTE: Redux関連
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'



// NOTE: original
import { HomeLayout } from '../layout'
import { FormItem } from '../modules'

const MenueBase = () => {
  return (
    <div>
      <HomeLayout title="商品一覧">
        menueBase
        <FormItem />
      </HomeLayout>
    </div>
  )
}

export default MenueBase
