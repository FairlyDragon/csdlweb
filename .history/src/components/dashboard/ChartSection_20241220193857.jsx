import { Card, CardContent, CardHeader, Box, Button } from '@mui/material';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Download } from '@mui/icons-material';

// Pie chart data
const pieData = [
  { name: 'Total Order', value: 81, color: '#EF4444' },
  { name: 'Customer Growth', value: 22, color: '#10B981' },
  { name: 'Total Revenue', value: 62, color: '#3B82F6' },
];

// Line chart data
const orderData = [
  { day: 'Sunday', orders: 400 },
  { day: 'Monday', orders: 300 },
  { day: 'Tuesday', orders: 450 },
  { day: 'Wednesday', orders: 280 },
  { day: 'Thursday', orders: 390 },
  { day: 'Friday', orders: 480 },
  { day: 'Saturday', orders: 380 },
];

export default function ChartSection() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mt: 3 }}>
      {/* Pie Charts */}
      <Card>
        <CardHeader title="Statistics" />
        <CardContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {pieData.map((data) => (
              <Box key={data.name} sx={{ textAlign: 'center' }}>
                <Box sx={{ height: 120 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { value: data.value },
                          { value: 100 - data.value },
                        ]}
                        innerRadius={30}
                        outerRadius={40}
                        startAngle={90}
                        endAngle={450}
                      >
                        <Cell fill={data.color} />
                        <Cell fill="#F3F4F6" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ fontSize: '0.875rem', color: 'text.secondary', mb: 1 }}>
                    {data.name}
                  </Box>
                  <Box sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                    {data.value}%
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Line Chart */}
      <Card>
        <CardHeader
          title="Chart Order"
          action={
            <Button
              variant="outlined"
              size="small"
              startIcon={<Download />}
            >
              Save Report
            </Button>
          }
        />
        <CardContent>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={orderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

