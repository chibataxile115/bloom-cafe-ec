import React from 'react'
// NOTE: original
import { FormItem } from '../modules/clientPageParts'
import { HomeLayout } from '../layout'

const ClientFormBase = () => {
  return (
    <div>
      <HomeLayout title="お客様情報">
        <FormItem />
      </HomeLayout>
    </div>
  )
}

export default ClientFormBase
