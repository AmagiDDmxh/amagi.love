import type { NextApiRequest, NextApiResponse } from 'next'

const { GITHUB_TOKEN = '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', GITHUB_USERNAME = 'amagiddmxh' } = process.env

interface ContributionDay {
  color: string
  contributionCount: number
  date: string
}

interface Week {
  contributionDays: ContributionDay[]
}

interface StatData {
  uv: number
  name: string
}

// GET /api/quote-count
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method?.toLowerCase() !== 'get') {
    return res.status(501)
  }

  const contributionsResponse = await getContributions()
  const total = contributionsResponse.data.user.contributionsCollection.contributionCalendar.totalContributions
  const works: StatData[] = contributionsResponse.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
    (week: Week) => week.contributionDays.map(({ contributionCount, date }) => ({ name: date, uv: contributionCount })),
  )

  const normalizedWorks = []
  let growth = works[0].uv
  let base = works[0].uv > 0 ? 1 : -10
  // const average = works.reduce((acc, { uv }) => acc + uv, 0) / works.length
  for (let i = works.length - 200 + 1; i < works.length; i++) {
    const work = works[i]
    const prevWork = works[i - 1] ?? { uv: 0 }
    const currLength = i + 1
    const { uv: currVal } = work
    const { uv: prevVal } = prevWork
    // const division = prevVal === 0 ? 1 : prevVal

    // const uv = (currVal / prevVal) ** (1 / (currLength - 1))
    // growth = (currVal - growth) / growth
    // const uv = currVal / prevVal - 1
    base = base + (currVal ? 1 : -10)

    base = normalizedWorks.push({
      name: work.name,
      // uv,
      // uv: currVal - prevVal,
      // uv: growth,
      uv: base,
    })
  }
  res.json({ data: normalizedWorks, total })
}

async function getContributions(token = GITHUB_TOKEN, username = GITHUB_USERNAME) {
  const headers = {
    Authorization: `bearer ${token}`,
  }
  const body = {
    query: `query {
          user(login: "${username}") {
            name
            contributionsCollection {
              contributionCalendar {
                colors
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    color
                  }
                  firstDay
                }
              }
            }
          }
        }`,
  }
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: headers,
  })
  const data = await response.json()
  return data
}
