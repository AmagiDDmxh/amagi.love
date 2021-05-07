import React from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, ReferenceLine, Tooltip, XAxis, YAxis } from 'recharts'
import useSWR from 'swr'

const colors = ['#316067', '#71dec2', '#8dc0b9']
const renderColor = ({ uv }: any) => {
  if (uv > 0) return colors[0]
  if (uv < 0) return colors[1]
  return colors[2]
}

const Tracker = () => {
  const { data: contribution } = useSWR('/api/contributions')

  return (
    <div>
      {!!contribution?.data.length && (
        <BarChart
          width={1400}
          height={600}
          data={contribution.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="uv">
            {contribution.data.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={renderColor(entry)} strokeWidth={entry === 0 ? 3 : entry} />
            ))}
          </Bar>
        </BarChart>
      )}
    </div>
  )
}

export default Tracker
