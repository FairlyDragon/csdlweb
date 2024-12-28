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
            {`revenue${entry.name.slice(-4)}`}: <span>${entry.value}</span>
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
          width: 8,
          height: 8,
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
    <Card sx={{ p: 3, height: '100%' }}>
      <Typography 
        variant="h6" 
        sx={{ 
          fontSize: 18,
          fontWeight: 600,
          color: '#212B36',
          mb: 2
        }}
      >
        Total Revenue
      </Typography>

      <Box sx={{ height: 280, width: '100%', mt: 1, mx: -3 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#637381', fontSize: 12 }}
              dy={10}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#637381', fontSize: 12 }}
              dx={-10}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ stroke: '#ddd', strokeDasharray: '4 4' }}
            />
            <Legend 
              content={<CustomLegend />}
              verticalAlign="top"
            />
            <Line
              type="natural"
              dataKey="revenue2023"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 4, fill: '#fff', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#fff', strokeWidth: 2 }}
            />
            <Line
              type="natural"
              dataKey="revenue2024"
              stroke="#FF4842"
              strokeWidth={2}
              dot={{ r: 4, fill: '#fff', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  )
}

