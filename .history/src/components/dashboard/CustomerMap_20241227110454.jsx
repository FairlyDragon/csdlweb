import { Box, Card, Typography, Select, MenuItem } from '@mui/material'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { day: 'Sun', value: 20 },
  { day: 'Mon', value: 40 },
  { day: 'Tue', value: 25 },
  { day: 'Wed', value: 35 },
  { day: 'Thu', value: 45 },
  { day: 'Fri', value: 30 },
  { day: 'Sat', value: 20 },
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
        <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
          {payload[0].value} Orders
        </Typography>
      </Box>
    )
  }
  return null
}

export default function CustomerMap() {
  return (
    <Card 
      sx={{ 
        p: 3,
        height: '100%',
        gridColumn: 'span 4', // Takes up 4 columns of 12
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography 
          variant="h6"
          sx={{
            fontSize: 18,
            fontWeight: 600,
            color: '#212B36'
          }}
        >
          Customer Map
        </Typography>
        <Select
          size="small"
          defaultValue="weekly"
          sx={{ 
            minWidth: 120,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E5E7EB',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E5E7EB',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E5E7EB',
            },
            fontSize: 14,
          }}
        >
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
        </Select>
      </Box>

      <Box sx={{ height: 240, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
            barSize={24}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#637381', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#637381', fontSize: 12 }}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
            />
            <Bar 
              dataKey="value" 
              fill="#10B981"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  )
}

