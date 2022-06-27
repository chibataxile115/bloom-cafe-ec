// NOTE: 必要なコンポーネントをインポート
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { User } from '../../types/types'

// NOTE: Null許可タイプ
// type Nullable<T> = T | null;

// NOTE: initialStateを定義
const initialState: User = {
  liffID: '',
  userName: '',
  uuid: '',
}

// NOTE: Sliceを定義する
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signin: (state: User, action: PayloadAction<User>) => {
      state.uuid = action.payload.uuid
    },
    signout: (state: User) => {
      state.liffID = ''
      state.userName = ''
      state.uuid = ''
    },
    updateUserProf: (state: User, action: PayloadAction<User>) => {
      state.liffID = action.payload.liffID
      state.userName = action.payload.userName
      state.uuid = action.payload.uuid
    },
  },
})

// NOTE: actionsをエクスポートする
export const { signin, signout, updateUserProf } = userSlice.actions
// NOTE: selectorをエクスポートする
export const selectUser = (state: RootState) => state.user
// NOTE: reducerをエクスポートする
export default userSlice.reducer
