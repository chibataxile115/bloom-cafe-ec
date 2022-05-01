// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { User } from '../../types/types'

// NOTE: Null許可タイプ
// type Nullable<T> = T | null;

// NOTE: Stateの型を定義する
interface UserState {
  User: User
}

// NOTE: initialStateを定義
const initialState: UserState = {
  User: {
    liffID: '',
    userName: '',
    uuid: '',
  },
}

// NOTE: Sliceを定義する
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<User>) => {
      state.User = action.payload
    },
    signout: (state) => {
      state.User = { liffID: '', userName: '', uuid: '' }
    },
    updateUserProf: (state, action: PayloadAction<User>) => {
      state.User.liffID = action.payload.liffID
      state.User.userName = action.payload.userName
      state.User.uuid = action.payload.uuid
    },
  },
})

// NOTE: actionsをエクスポートする
export const { signin, signout, updateUserProf } = userSlice.actions
// NOTE: selectorをエクスポートする
export const selectUser = (state: RootState) => state.user.User
// NOTE: reducerをエクスポートする
export default userSlice.reducer
