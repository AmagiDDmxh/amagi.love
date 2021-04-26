import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { randomInteger } from '../../lib/random'

// GET /api/quote
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method?.toLowerCase() !== 'get') {
    return res.status(501)
  }

  const quotes = await prisma.quote.findMany()
  const quote = quotes[randomInteger(0, quotes.length - 1)]
  await prisma.quote.updateMany({
    where: {
      id: quote.id,
    },
    data: {
      viewCount: { increment: 1 },
    },
  })
  res.json(quote)
}
