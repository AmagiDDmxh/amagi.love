import type { NextApiRequest, NextApiResponse } from 'next'

const { GITHUB_TOKEN, GITHUB_USERNAME = 'amagiddmxh' } = process.env

interface ContributionDay {
  color: string
  contributionCount: number
  date: string
}

interface Week {
  contributionDays: ContributionDay[]
}

interface StatData {
  contributionCount: number
  date: string
}

// GET /api/contributions
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method?.toLowerCase() !== 'get') {
    return res.status(501)
  }

  const contributionsResponse = await getContributions()
  const total = contributionsResponse.data.user.contributionsCollection.contributionCalendar.totalContributions
  const works: StatData[] = contributionsResponse.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
    (week: Week) =>
      week.contributionDays.map(({ contributionCount, date }) => ({
        date: new Date(date).getTime(),
        contributionCount,
      })),
  )

  const normalizedWorks = []
  // let base = works[0].contributionCount > 0 ? 1 : -10
  const average = works.reduce((acc, { contributionCount }) => acc + contributionCount, 0) / works.length
  const around = 7
  for (let i = works.length -183; i < works.length - around; i++) {
    const work = works[i]
    const recentAverage = getRecentAverage(works, i, around)
    const { contributionCount: currVal, date } = work
    // const division = prevVal === 0 ? 1 : prevVal

    // const uv = (currVal / prevVal) ** (1 / (currLength - 1))
    // growth = (currVal - growth) / growth
    // const uv = currVal / prevVal - 1

    normalizedWorks.push({
      date,
      currVal,
      recentAverage,
      average,
      // uv,
      // uv: currVal - prevVal,
      // uv: growth,
      uv: (currVal - recentAverage),
    })
  }
  res.json({ data: normalizedWorks, total, average })
}

function getRecentAverage(works: StatData[], index: number, around = 7) {
  const interval = Math.floor(around / 2)
  let recentAverage = 0
  for (let i = index - interval; i <= index + interval; i++) {
    const work = works[i]
    recentAverage += work.contributionCount / around
  }
  return recentAverage
}

async function getContributions(token = GITHUB_TOKEN, username = GITHUB_USERNAME) {
  const headers = {
    Authorization: `bearer ${token}`,
  }
  const body = {
    query: `
    query {
      user(login: "${username}") {
        name
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
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
