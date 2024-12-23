import { Box, Card, Typography, Button } from '@mui/material'
import { Download } from '@mui/icons-material'
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
  { name: 'Sunday', orders: 400 },
  { name: 'Monday', orders: 300 },
  { name: 'Tuesday', orders: 450 },
  { name: 'Wednesday', orders: 280 },
  { name: 'Thursday', orders: 390 },
  { name: 'Friday', orders: 480 },
  { name: 'Saturday', orders: 380 },
]

export default function OrderChart() {
  return (
    <Card sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h6">Chart Order</Typography>
          <Typography variant="body2" color="text.secondary">
            The number of orders by day of the week
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<Download />}
          size="small"
          sx={{ color: '#3b82f6', borderColor: '#3b82f6' }}
        >
          Save Report
        </Button>
      </Box>

      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  )
}

