import { Box, Card, Typography, Button } from '@mui/material'
import { Download } from '@mui/icons-material'
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart
} from 'recharts'

const data = [
  { name: 'Sunday', orders: 320 },
  { name: 'Monday', orders: 350 },
  { name: 'Tuesday', orders: 456 },
  { name: 'Wednesday', orders: 380 },
  { name: 'Thursday', orders: 410 },
  { name: 'Friday', orders: 490 },
  { name: 'Saturday', orders: 430 }
]

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: '#fff',
          p: '8px 12px',
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
          borderRadius: '6px',
          border: 'none'
        }}
      >
        <Typography sx={{ 
          fontSize: '14px',
          fontWeight: 500,
          color: '#111827'
        }}>
          {`${payload[0].value} Order`}
        </Typography>
        <Typography sx={{ 
          fontSize: '12px',
          color: '#9CA3AF'
        }}>
          OCT 16th, 2023
        </Typography>
      </Box>
    )
  }
  return null
}

export default function OrderChart() {
  return (
    <Card
      sx={{
        p: 3,
        border: '1px solid #E5E7EB',
        borderRadius: '12px',
        bgcolor: '#FFFFFF'
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          mb: 3
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#111827',
              mb: 0.5
            }}
          >
            Chart Order
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              color: '#9CA3AF'
            }}
          >
            The number of orders by day of the week
          </Typography>
        </Box>

        <Button
          startIcon={<Download sx={{ fontSize: 16 }} />}
          variant="outlined"
          sx={{
            color: '#2563EB',
            borderColor: '#E5E7EB',
            fontSize: '14px',
            textTransform: 'none',
            '&:hover': {
              borderColor: '#D1D5DB',
              bgcolor: '#F9FAFB'
            }
          }}
        >
          Save Report
        </Button>
      </Box>

      <Box sx={{ height: 240, mx: -3 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 30, left: 30, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}"/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: '#9CA3AF',
                fontSize: 12
              }}
              dy={10}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={false}
            />
            <Area
              type="monotone"
              dataKey="orders"
              fill="url(#colorOrders)"
              stroke="none"
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#60A5FA"
              strokeWidth={2}
              dot={{
                r: 4,
                fill: '#FFFFFF',
                stroke: '#60A5FA',
                strokeWidth: 2
              }}
              activeDot={{
                r: 6,
                fill: '#FFFFFF',
                stroke: '#60A5FA',
                strokeWidth: 2
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  )
}

