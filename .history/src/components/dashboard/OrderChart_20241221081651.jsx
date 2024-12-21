import { Card, Typography, Button, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download } from '@mui/icons-material';

const data = [
  { day: 'Sun', orders: 380 },
  { day: 'Mon', orders: 420 },
  { day: 'Tue', orders: 450 },
  { day: 'Wed', orders: 400 },
  { day: 'Thu', orders: 420 },
  { day: 'Fri', orders: 480 },
  { day: 'Sat', orders: 460 },
];

export default function OrderChart() {
  return (
    <Card sx={{ p: 3, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h6">Chart Order</Typography>
          <Typography variant="body2" color="text.secondary">
            The number of orders by day of the week
          </Typography>
        </Box>
        <Button
          startIcon={<Download />}
          variant="outlined"
          sx={{ color: '#2F80ED', borderColor: '#2F80ED' }}
        >
          Save Report
        </Button>
      </Box>
      
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              domain={[300, 600]}
              ticks={[300, 450, 600]}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#2F80ED"
              strokeWidth={2}
              dot={{ r: 4, fill: '#2F80ED' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}

