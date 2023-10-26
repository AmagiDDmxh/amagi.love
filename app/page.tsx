'use client'

import Quote from '#/components/Quote'
import { type Quote as QuoteType } from '#/typings/quote'
import useSWR from 'swr'

export default function HomePage() {
  const { data: quote } = useSWR<QuoteType>('/api/quote')

  return (
    <>
      {quote && <Quote {...quote} />}
      <div className="pl-2">
        <h1 className="text-black">Amagi&apos;s Home</h1>
        <p className="text-black">Oops, quite a nasty room. Other than that, nothings here.</p>
      </div>
    </>
  )
}
