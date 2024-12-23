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

export default function CustomerMap() {
  return (
    <Card sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Customer Map</Typography>
        <Select
          size="small"
          defaultValue="weekly"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
        </Select>
      </Box>

      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  )
}

