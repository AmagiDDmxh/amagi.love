import { PrismaClient, Prisma } from '@prisma/client'
import { quotes } from './example-data'

const prisma = new PrismaClient()
const quoteData: Prisma.QuoteCreateInput[] = quotes

async function main() {
  console.log(`Start seeding ...`)
  for (const q of quoteData) {
    const quote = await prisma.quote.create({
      data: q,
    })
    console.log(`Created quote with id: ${quote.id} and content: ${quote.content}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
