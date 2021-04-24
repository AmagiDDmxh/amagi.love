import { PrismaClient, Prisma } from '@prisma/client'
import { quotes } from './example-data'

const prisma = new PrismaClient()

// const bookData: Prisma.BookCreateInput[] = [

// ]

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
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
