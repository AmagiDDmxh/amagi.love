import { cache } from 'react'

export const getBaseUrl = cache(() =>
  process.env.VERCEL_URL ? 'https://amagi.love' : `http://localhost:${process.env.PORT ?? 7123}`,
)
