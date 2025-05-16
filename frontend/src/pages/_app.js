import '@/styles/globals.css'
import styles from '@/styles/application.scss'
import { HistoryProvider } from '../components/HistoryProvider'

export default function App({ Component, pageProps }) {
  return (
    <HistoryProvider>
      <Component {...pageProps} />
    </HistoryProvider>
  )
}
