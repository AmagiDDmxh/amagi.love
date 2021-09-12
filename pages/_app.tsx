import { AppProps } from 'next/app'
import useSWR from 'swr'

import Header from '../layouts/Header'
import Quote from '../components/Quote'
import '../styles/index.css'

const fetcher = (...args: any[]) => fetch(args[0], ...args.slice(1)).then((res) => res.json())

const App = ({ Component, pageProps }: AppProps) => {
  const { data: quote } = useSWR('/api/quote', fetcher)

  return (
    <div>
      <Header />
      <Quote {...quote} />
      <Component {...pageProps} />
    </div>
  )
}

export default App
