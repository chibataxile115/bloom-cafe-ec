export interface User {
  liffID: string
  userName: string
}

export interface MenueItems {
  id: number
  plice: number
  name: string
  quantity: number
}

export interface Step {
  stepIndex: number
  // FIXME: 後で削除する
  isCartModal?: boolean
}

export interface StoringData {
  id: number
  name: string
  isInCart: boolean
  count: number
  imageURL: string
  plice: number
}

export interface MenueList {
  documentId: string
  id: number
  name: string
  isInCart: boolean
  count: number
  imageURL: string
  plice: number
  isInit: boolean
}

export interface CartDetail {
  cartdetailTotal: number
}
