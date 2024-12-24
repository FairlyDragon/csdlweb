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
            Chart Order
          </Typography>
          <Typography variant="body2" sx={{ color: '#637381' }}>
            The number of orders by day of the week
          </Typography>
        </Box>
        <Button
          startIcon={<Download />}
          sx={{
            color: '#2065D1',
            bgcolor: '#F1F5F9',
            '&:hover': {
              bgcolor: '#E2E8F0'
            },
            textTransform: 'none',
            borderRadius: 1,
            px: 2
          }}
        >
          Save Report
        </Button>
      </Box>

      <Box sx={{ height: 300, width: '100%' }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2065D1" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#2065D1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              vertical={false}
              stroke="#919EAB"
              strokeOpacity={0.2}
            />
            <XAxis 
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#919EAB', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#919EAB', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#2065D1"
              strokeWidth={2}
              fill="url(#colorOrders)"
              dot={{ r: 4, fill: '#fff', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#2065D1', strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  )
}

