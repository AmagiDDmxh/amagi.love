import { Box, Divider, Text, TextProps } from '@dracula/dracula-ui'
import { FC } from 'react'

interface QuoteProps {
  content: string
  reference?: string
  author: string
  book: string
}

const BlackText: FC<TextProps> = ({ children, ...rest }) => (
  <Text color="black" {...rest}>
    {children}
  </Text>
)

const trimAll = (obj: Record<string, string>): Record<string, string> => {
  return Object.keys(obj).reduce((table, cur) => ({ ...table, [cur]: obj[cur]?.trim?.() }), {})
}

const normalizeOrigin = ({ book, author }: Partial<QuoteProps>) => {
  const comma = book ? ',' : ''
  const space = book?.startsWith('《') ? '' : ' '
  const origin = (book ? `${author}${comma}${space}${book}` : author) ?? ''
  if (origin.length > 45) {
    const array = origin.split(',')
    return (
      <Box py="xxs">
        {array[0]}
        <br />
        {array[1]}
      </Box>
    )
  }
  return origin
}

const Quote: FC<QuoteProps> = (props) => {
  const { content, author, reference, book } = props.content ? trimAll((props as any) as Record<string, string>) : props
  const origin = normalizeOrigin({ book, author })

  return (
    <li style={{ display: 'flex', flexDirection: 'column', padding: '1rem', maxWidth: '33rem' }}>
      <BlackText size="sm" weight="semibold">
        “{content}“
      </BlackText>
      {reference && (
        <BlackText size="xs" style={{ paddingLeft: '5rem', color: '#414558' }}>
          ——{reference}
        </BlackText>
      )}
      <BlackText size="xs" style={{ paddingLeft: '5rem' }}>
        ——{origin}
      </BlackText>
    </li>
  )
}

export default Quote
