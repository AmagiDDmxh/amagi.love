import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ResponsiveContainerProps,
} from 'recharts'
import useSWR from 'swr'
import { eachMonthOfInterval, getUnixTime, format } from 'date-fns'

export const calcXDomain = (ticks: number[], data: { date: number }[]): [number, number] => {
  const start = ticks[0]
  const lastTick = ticks[ticks.length - 1]
  const lastDate = data[data.length - 1].date / 1000
  // if the last data point is after last tick/label use datapoint's timestamp to mark the end of the interval
  const end = lastDate && lastTick < lastDate ? lastDate : lastTick

  const xPadding = 3600 * 24 * 30 // 30 days
  return [start, end + xPadding]
}

const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props
  const date = new Date(payload.value)
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#000" style={{ fontVariantNumeric: 'tabular-nums' }}>
        {date && format(date, 'MM/dd/yyyy')}
      </text>
    </g>
  )
}

const colors = ['#71dec2', '#316067', '#8dc0b9']
const renderColor = ({ uv }: any) => {
  if (uv > 0) return colors[0]
  if (uv < 0) return colors[1]
  return colors[2]
}

// https://github.com/recharts/recharts/issues/1767#issuecomment-598607012
const CustomResponsiveContainer = (props: ResponsiveContainerProps) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <ResponsiveContainer {...props} />
      </div>
    </div>
  )
}

const Tracker = () => {
  const { data: contribution } = useSWR('/api/contributions')

  const xTicks = useMemo(() => {
    if (!contribution?.data?.length) return []
    const first = contribution.data[0]
    const last = contribution.data[contribution.data.length - 1]

    const start = first.date
    const end = last.date
    const intervals = eachMonthOfInterval({ start, end })
    return intervals.map((date) => date.getTime())
  }, [contribution])

  const formatYAxis = (value: number) => {
    return value.toFixed(2)
  }

  const renderTooltip = ({ active, label, payload }: { active?: boolean; label?: number; payload?: any[] }) => {
    if (!active || !payload || !payload?.length || !label) return null

    const [uvData, recentAverageData, countData] = payload
    const formattedTime = format(label, 'yyyy.MM.dd')
    return (
      <div className="flex items-start p-2 text-sm font-semibold text-white bg-orange-600">
        {formattedTime}
        <br />
        ---
        <br />
        Comparison {uvData.value.toFixed(5)}
        <br />
        ---
        <br />
        Recent Average {recentAverageData.value.toFixed(5)}
        <br />
        ---
        <br />
        {countData && `Contribution Count ${countData.value}`}
      </div>
    )
  }

  return (
    <div className="h-[600px] py-8 px-16">
      {!!contribution?.data.length && (
        <CustomResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={contribution.data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} stroke="#aaa" strokeDasharray="5 5" />
            <XAxis
              type="number"
              domain={calcXDomain(xTicks, contribution.data)}
              interval="preserveEnd"
              dataKey="date"
              ticks={xTicks}
              tick={<CustomXAxisTick />}
            />
            <YAxis
              scale="linear"
              // domain={[
              //   (dataMin: number) => (contribution.average - Math.abs(dataMin)) * 1.2,
              //   (dataMax: number) => dataMax * 1.2,
              // ]}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={renderTooltip} />
            <Legend />
            <ReferenceLine y={0} stroke="#000" strokeWidth={1} />
            <Bar dataKey="uv" type="monotone">
              {contribution.data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={renderColor(entry)} strokeWidth={1} />
              ))}
            </Bar>
            <ReferenceLine y={contribution.average} stroke="#aa2429" strokeWidth={1} />
            <Line type="monotone" dataKey="recentAverage" stroke="#8884d8" dot={false} />
            <Line type="monotone" dataKey="currVal" stroke="#e54d21" dot={false} />
            <Line type="basisOpen" dataKey="uv" stroke="#000" strokeWidth={1} dot={false} />
          </ComposedChart>
        </CustomResponsiveContainer>
      )}
    </div>
  )
}

export default Tracker
