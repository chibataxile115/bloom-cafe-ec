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
  isMenueDetailModal: boolean
  isMenueDeleteModal: boolean
}

export interface SnackBar {
  isOpenTheMenueRegistSnackbar: boolean
  isOpenTheImageUploadSnacbar: boolean
  isOpenTheMenueDeleteSnackbar: boolean
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
  // FIXME: 後で削除する
  isCartModal?: boolean
}

export interface StoringData {
  docID: string
  id: number
  name: string
  category: string
  isInCart: boolean
  count: number
  imageURL: string
  plice: string
  isInit: boolean
}

export interface MenueList {
  docID: string
  id: number
  name: string
  category: string
  isInCart: boolean
  count: number
  imageURL: string
  plice: number
  isInit: boolean
}

export interface AdminMenueDetail {
  docID: string
  id: number
  name: string
  category: string
  count: number
  imageURL: string
  plice: string
}

export interface CartDetail {
  cartdetailTotal: number
}

export interface SubmitMenueArgs {
  uploadImages: UploadImage[]
  menueDetail: SubmitMenue
}

export interface MenueFromFirestore {
  createdAt: Date
  category: string
  detailImagesCount: number
  plice: number
  imageURL: string
  updatedAt: Date
  docID: string
  name: string
}

export interface CategoryItemsFromFirestore {
  // createdAt: Date
  categoryName: string
}

export interface SubImagesFromFirestore {
  createdAt: Date
  docID: number
  imageName: string
  imageURL: string
  updatedAt: Date
}

export interface MenuePage {
  isOpenCartModal: boolean
}
