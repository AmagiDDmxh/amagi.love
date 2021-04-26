import { AppProps } from 'next/dist/next-server/lib/router/router'
import useSWR from 'swr'
import Router from 'next/router'

import Header from '../layouts/Header'
import Quote from '../components/Quote'
import '../styles/index.css'
import '@dracula/dracula-ui/styles/dracula-ui.css'
import { IFuncUpdater, isFunction } from '../lib/hooks'
import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

// FIXME: Well, any type and type definition is here
interface CustomNodeJsGlobal extends NodeJS.Global {
  analytics: any
}
declare const global: CustomNodeJsGlobal

function getStoredValue<T>(storage: Storage, key: string, defaultValue: T) {
  const raw = storage.getItem(key)
  if (raw) {
    try {
      return JSON.parse(raw)
    } catch (e) {
      //
    }
  }
  if (isFunction<IFuncUpdater<T>>(defaultValue)) {
    return defaultValue()
  }
  return defaultValue
}

const App = ({ Component, pageProps }: AppProps) => {
  Router.events.on('routeChangeComplete', (url) => {
    global.analytics.page(url)
  })

  const [userId, setUserId] = useState()

  const { data: quote } = useSWR(['/api/quote', userId], async (path: string, requestUserId: string) => {
    global.analytics.track('Getting Quote', {
      quoteId: quote.id,
    })
    const result = await fetch(path)
    return result.json()
  })

  useEffect(() => {
    setUserId(getStoredValue(localStorage, '__USERID__', nanoid()))
  }, [])

  useEffect(() => {
    localStorage.setItem('__USERID__', userId!)
    // global.analytics.identify(userId)
  }, [userId])

  return (
    <div>
      <Header name="AmagiDDmxh" />
      {quote && <Quote {...quote} />}
      <Component {...pageProps} />
    </div>
  )
}

export default App
