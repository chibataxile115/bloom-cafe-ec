import '../styles/globals.css'
import type { AppProps } from 'next/app'
// NOTE: Redux関連
import { Provider } from 'react-redux'
import { store } from '../redux/app/store'
// NOTE: LIFF関連
import { LiffProvider } from '../hooks/liff/useLiffProvider'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <LiffProvider>
        <Component {...pageProps} />
      </LiffProvider>
    </Provider>
  )
}

export default MyApp
