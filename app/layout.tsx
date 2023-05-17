import '#/styles/globals.css'
import Header from '#/components/Header'
import Quote, { QuoteProps } from '#/components/Quote'
import { notFound } from 'next/navigation'
import { getBaseUrl } from '#/lib/getBaseUrl'

export const metadata = {
  title: 'Amagi',
  description: 'Developer',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const quoteProps = await getQuoteProps()

  return (
    <html lang="en">
      <body>
        <Header />
        <Quote {...quoteProps} />
        {children}
      </body>
    </html>
  )
}

async function getQuoteProps() {
  const res = await fetch(`${getBaseUrl()}/api/quote`)

  if (!res.ok) {
    // Render the closest `error.js` Error Boundary
    throw new Error('Something went wrong!')
  }

  const quoteProps = (await res.json()) as QuoteProps

  if (!quoteProps) {
    // Render the closest `not-found.js` Error Boundary
    notFound()
  }

  return quoteProps
}
