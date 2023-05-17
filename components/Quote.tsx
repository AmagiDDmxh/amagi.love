'use client'
import { type Quote as QuoteType } from '#/typings/quote'

const trimAllContentIf = (obj: QuoteType): QuoteType => {
  if (!obj.content) {
    return obj
  }

  const keys = Object.keys(obj) as (keyof QuoteType)[]
  return keys.reduce((table, cur) => ({ ...table, [cur]: obj[cur]?.trim?.() }), {} as QuoteType)
}

const normalizeOrigin = ({ book, author }: Partial<QuoteType>) => {
  const comma = book ? ',' : ''
  const space = book?.startsWith('《') ? '' : ' '
  const origin = (book ? `${author}${comma}${space}${book}` : author) ?? ''
  if (origin.length > 45) {
    const [theAuthor, theBook] = origin.split(',')
    return (
      <div className="p-4">
        {theAuthor}
        <br />
        {theBook}
      </div>
    )
  }
  return origin
}

const Quote = (props: QuoteType) => {
  const { content, author, reference, book } = trimAllContentIf(props)
  const origin = normalizeOrigin({ book, author })

  return (
    <li style={{ display: 'flex', flexDirection: 'column', padding: '1rem', maxWidth: '33rem' }}>
      <p>“{content}“</p>
      {reference && <p style={{ paddingLeft: '5rem', color: '#414558' }}>——{reference}</p>}
      <p style={{ paddingLeft: '5rem' }}>——{origin}</p>
    </li>
  )
}

export default Quote
