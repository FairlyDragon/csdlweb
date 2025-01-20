import { useState } from 'react'
import { Box, Card, Typography, Select, MenuItem } from '@mui/material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const generateData = (period) => {
  switch(period) {
    case 'day':
      return [
        { date: 'Sun', revenue: 32000 },
        { date: 'Mon', revenue: 45000 },
        { date: 'Tue', revenue: 38000 },
        { date: 'Wed', revenue: 42000 },
        { date: 'Thu', revenue: 48000 },
        { date: 'Fri', revenue: 43000 },
        { date: 'Sat', revenue: 36000 }
      ]
    case 'week':
      return [
        { date: 'Week 1', revenue: 180000 },
        { date: 'Week 2', revenue: 195000 },
        { date: 'Week 3', revenue: 187000 },
        { date: 'Week 4', revenue: 198000 }
      ]
    case 'month':
      return [
        { date: 'Jan', revenue: 720000 },
        { date: 'Feb', revenue: 680000 },
        { date: 'Mar', revenue: 750000 },
        { date: 'Apr', revenue: 795000 },
        { date: 'May', revenue: 820000 },
        { date: 'Jun', revenue: 835000 },
        { date: 'Jul', revenue: 845000 },
        { date: 'Aug', revenue: 855000 },
        { date: 'Sep', revenue: 880000 },
        { date: 'Oct', revenue: 895000 },
        { date: 'Nov', revenue: 920000 },
        { date: 'Dec', revenue: 980000 }
      ]
    default:
      return []
  }
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: '#fff',
          p: 1.5,
          border: '1px solid #f5f5f5',
          borderRadius: 1,
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
          fontSize: '12px',
        }}
      >
        <Typography sx={{ color: '#637381', mb: 0.5 }}>
          {label}
        </Typography>
        <Typography sx={{ 
          color: '#FF4842', 
          fontWeight: 600,
          fontSize: '13px'
        }}>
          ${payload[0].value.toLocaleString('en-US')}
        </Typography>
      </Box>
    )
  }
  return null
}

export default function RevenueChart() {
  const [period, setPeriod] = useState('month')
  const data = generateData(period)

  const getYAxisTickFormatter = (period) => {
    switch(period) {
      case 'day':
        return (value) => `$${value/1000}k`
      case 'week':
        return (value) => `$${value/1000}k`
      case 'month':
        return (value) => `$${value/1000}k`
      default:
        return (value) => value
    }
  }

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
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontSize: 18,
            fontWeight: 600,
            color: '#212B36',
          }}
        >
          Total Revenue
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            color: '#FF4842',
            fontSize: '13px'
          }}>
            <Box sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              bgcolor: '#FF4842' 
            }} />
            Revenue
          </Box>
          
          <Select
            size="small"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            sx={{ 
              minWidth: 100,
              height: 32,
              fontSize: '13px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E5E7EB',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E5E7EB',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FF4842',
              },
            }}
          >
            <MenuItem value="day">Daily</MenuItem>
            <MenuItem value="week">Weekly</MenuItem>
            <MenuItem value="month">Monthly</MenuItem>
          </Select>
        </Box>
      </Box>

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
              dataKey="date" 
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
              tickFormatter={getYAxisTickFormatter(period)}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={false}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#FF4842"
              strokeWidth={2}
              dot={{ 
                r: 4, 
                fill: '#FF4842', 
                strokeWidth: 2, 
                stroke: '#fff' 
              }}
              activeDot={{ 
                r: 6, 
                fill: '#FF4842', 
                strokeWidth: 2, 
                stroke: '#fff',
                boxShadow: '0 0 6px rgba(255, 72, 66, 0.5)'
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  )
}

