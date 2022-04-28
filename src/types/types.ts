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

export interface AdminPage {
  isMenueSubmitModal: boolean
  isMenueSubmitLoading: boolean
}

export interface SnackBar {
  isOpenTheMenueRegistSnackbar: boolean
  isOpenTheImageUploadSnacbar: boolean
  mode: 'success' | 'error'
  // TODO: 余裕があったらtransitionさせる方向をdirectionで指定できるようにする
  // direction: 'up' | 'down' | 'right' | 'left'
}

export interface UploadImage {
  imageName: string
  imageURL: string
}

export interface SubmitMenue {
  name: string
  plice: string
  category: string
  menueIDR: string
  menueIDL: string
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

export interface SubmitMenueArgs {
  uploadImages: UploadImage[]
  menueDetail: SubmitMenue
}
