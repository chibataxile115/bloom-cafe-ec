import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../redux/app/store'
import SigninBase from '../SigninBase'

describe('SigninBase Tests', () => {
  it('Should render text items', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <SigninBase />
      </Provider>
    )
    expect(getByText('管理者ログイン')).toBeInTheDocument()
    expect(getByText('メールアドレス')).toBeInTheDocument()
    expect(getByText('パスワード')).toBeInTheDocument()
    expect(getByText('パスワードを表示')).toBeInTheDocument()
    expect(getByText('パスワードを忘れてしまいましたか?')).toBeInTheDocument()
    expect(getByText('サインイン')).toBeInTheDocument()
  })
})
