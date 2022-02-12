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
  },
}

// NOTE: Sliceを定義する
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    deAuth: (state) => {
      state.User = { liffID: '', userName: '' }
    },
    auth: (state, action: PayloadAction<User>) => {
      state.User.liffID = action.payload.liffID
      state.User.userName = action.payload.userName
    },
  },
})

// NOTE: actionsをエクスポートする
export const { deAuth, auth } = userSlice.actions
// NOTE: selectorをエクスポートする
export const selectUser = (state: RootState) => state.user.User
// NOTE: reducerをエクスポートする
export default userSlice.reducer
