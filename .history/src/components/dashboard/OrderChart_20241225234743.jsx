import { Box, Card, Typography, Button } from '@mui/material'
import { Download } from '@mui/icons-material'
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
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
          p: '12px 16px',
          boxShadow: '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
          borderRadius: '8px',
          border: '1px solid #F2F4F7'
        }}
      >
        <Typography sx={{ 
          fontSize: '14px',
          fontWeight: 500,
          color: '#111827',
          mb: 0.5
        }}>
          {`${payload[0].value} Order`}
        </Typography>
        <Typography sx={{ 
          fontSize: '12px',
          color: '#6B7280'
        }}>
          Oct 16th, 2023
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
        borderRadius: '24px',
        bgcolor: '#FFFFFF',
        boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)'
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
              fontSize: '20px',
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
              color: '#6B7280'
            }}
          >
            The number of orders by day of the week.
          </Typography>
        </Box>

        <Button
          startIcon={<Download sx={{ fontSize: 18 }} />}
          variant="outlined"
          sx={{
            color: '#2563EB',
            borderColor: '#E5E7EB',
            borderRadius: '8px',
            fontSize: '14px',
            textTransform: 'none',
            px: 2,
            py: 1,
            '&:hover': {
              borderColor: '#2563EB',
              bgcolor: 'transparent'
            }
          }}
        >
          Save Report
        </Button>
      </Box>

      <Box sx={{ height: 120, mx: -3 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 30, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
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
              type="natural"
              dataKey="orders"
              stroke="#2563EB"
              strokeWidth={2}
              fill="url(#colorOrders)"
              dot={{
                r: 4,
                fill: '#FFFFFF',
                stroke: '#2563EB',
                strokeWidth: 2
              }}
              activeDot={{
                r: 6,
                fill: '#FFFFFF',
                stroke: '#2563EB',
                strokeWidth: 2
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  )
}

