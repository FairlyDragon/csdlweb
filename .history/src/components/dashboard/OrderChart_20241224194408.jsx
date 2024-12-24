import { Box, Card, Typography, Button } from '@mui/material'
import { Download } from '@mui/icons-material'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { name: 'Sunday', orders: 380 },
  { name: 'Monday', orders: 400 },
  { name: 'Tuesday', orders: 456 },
  { name: 'Wednesday', orders: 350 },
  { name: 'Thursday', orders: 400 },
  { name: 'Friday', orders: 420 },
  { name: 'Saturday', orders: 470 },
]

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: '#fff',
          p: 1.5,
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
          borderRadius: 1,
        }}
      >
        <Typography sx={{ color: '#212B36', fontSize: 14, fontWeight: 600 }}>
          {payload[0].value} Order
        </Typography>
        <Typography sx={{ color: '#919EAB', fontSize: 12 }}>
          Oct 18th 2023
        </Typography>
      </Box>
    )
  }
  return null
}

export default function OrderChart() {
  return (
    <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#212B36' }}>
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

