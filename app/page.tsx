import Quote from '#/components/Quote'
import { getBaseUrl } from '#/lib/getBaseUrl'
import { type Quote as QuoteType } from '#/typings/quote'

export default async function HomePage() {
  const quote = (await fetch(`${getBaseUrl()}/api/quote`, { cache: 'no-store' }).then((x) => x.json())) as QuoteType

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
