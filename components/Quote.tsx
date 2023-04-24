import { FC } from 'react'

interface QuoteProps {
  content: string
  reference?: string
  author: string
  book: string
}

const trimAll = (obj: Record<string, string>): Record<string, string> => {
  return Object.keys(obj).reduce((table, cur) => ({ ...table, [cur]: obj[cur]?.trim?.() }), {})
}

const normalizeOrigin = ({ book, author }: Partial<QuoteProps>) => {
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

const Quote: FC<QuoteProps> = (props) => {
  const { content, author, reference, book } = props.content ? trimAll((props as any) as Record<string, string>) : props
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
