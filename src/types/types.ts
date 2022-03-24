export interface User {
  liffID: string
  userName: string
  uuid: string
}

export interface AuthPage {
  email: string
  password: string
  isLogin: boolean
  modal: boolean
  reset: boolean
  showPassword: boolean
  isLoading: boolean
}

export interface MenueItems {
  id: number
  plice: number
  name: string
  quantity: number
}

export interface Step {
  stepIndex: number
}

export interface StoringData {
  count: number
  plice: number
  imageURL: string
  name: string
}

export interface MenueList {
  id: number
  name: string
  isInCart: boolean
  count: number
  imageURL: string
  plice: number
}
