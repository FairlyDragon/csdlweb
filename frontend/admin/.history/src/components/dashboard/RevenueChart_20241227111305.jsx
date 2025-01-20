import { Box, Card, Typography } from '@mui/material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts'

const data = [
  { month: 'Jan', revenue2023: 19000, revenue2024: 28000 },
  { month: 'Feb', revenue2023: 21000, revenue2024: 29000 },
  { month: 'Mar', revenue2023: 20000, revenue2024: 31000 },
  { month: 'Apr', revenue2023: 23000, revenue2024: 32000 },
  { month: 'May', revenue2023: 25000, revenue2024: 33000 },
  { month: 'Jun', revenue2023: 28000, revenue2024: 35000 },
  { month: 'Jul', revenue2023: 30000, revenue2024: 34000 },
  { month: 'Aug', revenue2023: 32000, revenue2024: 32000 },
  { month: 'Sep', revenue2023: 28000, revenue2024: 35000 },
  { month: 'Oct', revenue2023: 29000, revenue2024: 33000 },
  { month: 'Nov', revenue2023: 30000, revenue2024: 34000 },
  { month: 'Dec', revenue2023: 31000, revenue2024: 36000 },
]

const formatValue = (value) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: '#fff',
          p: 1.5,
          border: '1px solid #eee',
          borderRadius: 1,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography sx={{ fontSize: 12, color: '#637381', mb: 1 }}>
          {label}
        </Typography>
        {payload.map((entry, index) => (
          <Box 
            key={index} 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: entry.color,
              fontSize: 13,
              '& > span': { fontWeight: 600 }
            }}
          >
            {`${entry.dataKey === 'revenue2023' ? '2023' : '2024'}`}: <span>{formatValue(entry.value)}</span>
          </Box>
        ))}
      </Box>
    )
  }
  return null
}

const CustomLegend = ({ payload }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        gap: 3, 
        mb: 2,
        '& .legend-item': {
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontSize: 13,
          color: '#637381',
        },
        '& .legend-dot': {
          width: 6,
          height: 6,
          borderRadius: '50%',
        }
      }}
    >
      {payload.map((entry, index) => (
        <Box key={index} className="legend-item">
          <Box 
            className="legend-dot" 
            sx={{ bgcolor: entry.color }}
          />
          {entry.value}
        </Box>
      ))}
    </Box>
  )
}

export default function RevenueChart() {
  return (
    <Card 
      sx={{ 
        p: 3, 
        height: '100%',
        width: '100%',
        borderRadius: '24px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          fontSize: 18,
          fontWeight: 600,
          color: '#212B36',
          mb: 3
        }}
      >
        Total Revenue
      </Typography>

      <Box sx={{ height: 240, width: '100%', mt: 1, mx: -3 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              stroke="rgba(145, 158, 171, 0.2)"
            />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#919EAB', fontSize: 11 }}
              dy={10}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#919EAB', fontSize: 11 }}
              dx={-10}
              tickFormatter={(value) => `$${value/1000}k`}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={false}
            />
            <Legend 
              content={<CustomLegend />}
              verticalAlign="top"
            />
            <ReferenceLine 
              x="Jun" 
              stroke="rgba(145, 158, 171, 0.2)" 
              strokeDasharray="3 3"
              label={{
                position: 'top',
                value: '$36,703.00',
                fill: '#919EAB',
                fontSize: 11,
              }}
            />
            <ReferenceLine 
              x="Oct" 
              stroke="rgba(145, 158, 171, 0.2)" 
              strokeDasharray="3 3"
              label={{
                position: 'bottom',
                value: '$15,603.00',
                fill: '#919EAB',
                fontSize: 11,
              }}
            />
            <Line
              type="natural"
              dataKey="revenue2023"
              stroke="#2065D1"
              strokeWidth={2}
              dot={{ r: 2, fill: '#fff', strokeWidth: 2 }}
              activeDot={{ r: 4, fill: '#fff', strokeWidth: 2 }}
            />
            <Line
              type="natural"
              dataKey="revenue2024"
              stroke="#FF4842"
              strokeWidth={2}
              dot={{ r: 2, fill: '#fff', strokeWidth: 2 }}
              activeDot={{ r: 4, fill: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  )
}

