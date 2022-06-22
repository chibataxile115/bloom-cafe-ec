import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
// NOTE: original
import { FormItem } from '../modules/clientPageParts'
import { HomeLayout } from '../layout'

const ClientFormBase = () => {
  return (
    <div>
      <HomeLayout title="情報入力">
        <FormItem />
      </HomeLayout>
    </div>
  )
}

export default ClientFormBase
