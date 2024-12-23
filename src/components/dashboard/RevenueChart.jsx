import { Box, Card, Typography } from '@mui/material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { month: 'Jan', revenue2023: 20000, revenue2024: 25000 },
  { month: 'Feb', revenue2023: 22000, revenue2024: 28000 },
  { month: 'Mar', revenue2023: 25000, revenue2024: 30000 },
  { month: 'Apr', revenue2023: 23000, revenue2024: 32000 },
  { month: 'May', revenue2023: 28000, revenue2024: 35000 },
  { month: 'Jun', revenue2023: 30000, revenue2024: 38000 },
]

export default function RevenueChart() {
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>Total Revenue</Typography>
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue2023"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="revenue2024"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  )
}

