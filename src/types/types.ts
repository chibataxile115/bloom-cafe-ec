export interface User {
  liffID: string
  userName: string
  uuid: string
}

export interface possibleTime {
  id: number
  time: string
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
  isOpenTheFetchZipcodeSnackbar: boolean
  mode: 'success' | 'error'
  // TODO: 余裕があったらtransitionさせる方向をdirectionで指定できるようにする
  // direction: 'up' | 'down' | 'right' | 'left'
}

export interface UploadImage {
  imageName: string
  imageURL: string
}

// メニュー新規登録用
export interface SubmitMenue {
  name: string
  plice: string
  category: string
  menueIDR: string
  menueIDL: string
  description: string
}

// お客様情報の入力フォーム用
export interface ClientInfo {
  zipcode: string
  prefectures: string
  municipalities: string
  addressBuilding: string
  clientName: string
  phoneNumber: string
  deliveryDate: string
  deliveryTime: string
  remarks: string
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
  description: string
  isInit: boolean
}

export interface AdminMenuDetail {
  docID: string
  id: number
  name: string
  category: string
  count: number
  imageURL: string
  plice: number
  description: string
  isNameEdit: boolean
  isPliceEdit: boolean
  isDescriptionEdit: boolean
}

export interface CartDetail {
  totalCount: number
  totalPlice: number
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
  description: string
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
