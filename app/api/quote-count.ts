import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

// GET /api/quote-count
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method?.toLowerCase() !== 'get') {
    return res.status(501)
  }

  const quotes = await prisma.quote.findMany()
  const viewCount = quotes.reduce((sum, { viewCount }) => sum + viewCount, 0)
  res.json(viewCount)
}
