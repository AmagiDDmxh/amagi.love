import { Prisma } from '@prisma/client'
import { randomInteger } from '../../../lib/random'

// GET /api/quote
export async function GET(req: Request) {
  if (req.method?.toLowerCase() !== 'get') {
    return new Response(null, { status: 501 })
  }

  const quote = data[randomInteger(0, data.length - 1)]
  return new Response(JSON.stringify(quote), { status: 200, })
}

const hackerQuote = {
  book: 'How to Become a Hacker',
  author: 'Eric Steven Raymond',
  // Better trimed and no tab between
  content: `If you aren't the kind of person that feels this way naturally,
  you'll need to become one in order to make it as a hacker.
  Otherwise you'll find your hacking energy is sapped by distractions like sex, money, and social approval.`,
}

const citadelleQuote = {
  author: `安东尼·圣艾修伯里(Antoine de Saint-Exupéry)`,
  book: `《城堡》(Citadelle)`,
  content: `如果你想造船，不要召集人们去伐木，也不要给他们分配任务，只需告诉他们大海的广阔无垠。If you want to build a ship, don't drum up the men to gather wood, divide the work and give orders. Instead, teach them to yearn for the vast and endless sea.`,
}

const fictionQuote = {
  author: '杨·马特尔',
  book: '《标本师的魔幻剧本》(Beatrice and Virgil)',
  content: '好小说的任务就是让不安的人得到安慰，让安逸的人感到不安。',
  reference: '戴维·福斯特·华莱士与劳瑞·麦卡弗里的谈话 - 小说和写实难以区分',
}

const data: Prisma.QuoteCreateInput[] = [
  hackerQuote,
  citadelleQuote,
  fictionQuote,
  {
    content: `The term ‘function’ got into mathematics, I was told by Prof. K. O. May, due to a misinterpretation of a proper usage by Leibniz. Nevertheless, it has become a fundamental concept of mathematics and whatever it is called, it deserves better treatment. There is perhaps no better example in mathematical education of missed opportunities than in the treatment of functions.`,
    author: 'Preston C. Hammer',
    book: 'Standards and Mathematical Terminology',
  },
  {
    content: `我不能创造的东西，我就没有理解。What I cannot create, I do not understand.`,
    author: '理查德·费曼(Richard Feynman)',
    reference: '写在他去世时的黑板上',
  },
  {
    content: `You have no responsibility to live up what other people think you ought to accomplish.
    I have no responsibility to be like they expect me to be. It's their mistake, not my failing.`,
    author: '理查德·费曼(Richard Feynman)',
  },
  {
    content: `数学的精髓全在于自由。`,
    author: '格奥尔格·康托尔(Georg Cantor)',
    book: '《论文集》(Gesammelte Abhandlungen)',
  },
  {
    content: '几行推理就能改变我们对世界的认识。',
    author: '史蒂文·兰兹伯格(Steven E. Landsburg)',
    book: '《扶手椅中的经济学家》(The Armchair Economist)',
  },
  {
    content: '微积分是迄今为止人类智慧发明的最有力的思维武器。',
    author: '威廉·本杰明·史密斯(W. B. Smith)',
    book: '《无穷小分析》(Infinitesimal Analysis)',
  },
  {
    content: `爱过却失去，总好过从未爱过。
    ‘Tis better to have loved and lost than never to have loved at all. `,
    author: 'Alfred Lord Tennyson (1809-1892)',
    book: 'In Memoriam A. H. H',
  },
  // ...More
]
