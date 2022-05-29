import '../styles/globals.css'
import type { AppProps } from 'next/app'
// NOTE: Redux関連
import { Provider } from 'react-redux'
import { store } from '../redux/app/store'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
