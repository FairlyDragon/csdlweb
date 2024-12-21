import { Box, Card, Typography, IconButton, Button } from '@mui/material';
import { MoreVert, Download } from '@mui/icons-material';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

// Stats Data
const statsData = [
  {
    title: 'Total Orders',
    value: '75',
    change: '+12% from last month',
    icon: '🫖',
  },
  {
    title: 'Total Delivered',
    value: '357',
    change: '+8% from last month',
    icon: '📦',
  },
  {
    title: 'Total Canceled',
    value: '65',
    change: '-2% from last month',
    icon: '❌',
  },
  {
    title: 'Total Revenue',
    value: '$128',
    change: '+18% from last month',
    icon: '💰',
  },
];

// Pie Chart Data
const pieChartData = [
  { name: 'Total Order', value: 81, color: '#FF6B6B' },
  { name: 'Customer Growth', value: 22, color: '#4ADE80' },
  { name: 'Total Revenue', value: 62, color: '#60A5FA' },
];

// Order Chart Data
const orderChartData = [
  { day: 'Sunday', orders: 380 },
  { day: 'Monday', orders: 420 },
  { day: 'Tuesday', orders: 450 },
  { day: 'Wednesday', orders: 400 },
  { day: 'Thursday', orders: 420 },
  { day: 'Friday', orders: 480 },
  { day: 'Saturday', orders: 460 },
];

// Customer Reviews
const reviews = [
  {
    id: 1,
    name: 'Jons Sena',
    time: '2 days ago',
    rating: 4.5,
    comment: 'The best dish I've ever experienced in my life',
    image: '/food1.jpg',
  },
  {
    id: 2,
    name: 'Sofia',
    time: '2 days ago',
    rating: 4.0,
    comment: 'Really love food from FairyDragon',
    image: '/food2.jpg',
  },
  {
    id: 3,
    name: 'Tai',
    time: '3 days ago',
    rating: 5.0,
    comment: 'Món này rất là ngon và hương thơn',
    image: '/food3.jpg',
  },
];

export default function Dashboard() {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 1 }}>Dashboard</Typography>
          <Typography color="text.secondary">
            Hi, Admin, Welcome back to FairyDragon Admin!
          </Typography>
        </Box>
        <Card sx={{ p: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box component="img" src="/calendar-icon.png" sx={{ width: 20, height: 20 }} />
          <Typography>Filter Period</Typography>
        </Card>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, mb: 3 }}>
        {statsData.map((stat) => (
          <Card key={stat.title} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: '#F0FDF4',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                }}
              >
                {stat.icon}
              </Box>
              <Box>
                <Typography color="text.secondary" fontSize="0.875rem">
                  {stat.title}
                </Typography>
                <Typography variant="h4" sx={{ my: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography color="text.secondary" fontSize="0.75rem">
                  {stat.change}
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Charts Section */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
        {/* Pie Charts */}
        <Card>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Pie Chart</Typography>
            <IconButton>
              <MoreVert />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 3 }}>
            {pieChartData.map((data) => (
              <Box key={data.name} sx={{ textAlign: 'center' }}>
                <Box sx={{ width: 120, height: 120 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={[{ value: data.value }, { value: 100 - data.value }]}
                        innerRadius={35}
                        outerRadius={45}
                        startAngle={90}
                        endAngle={450}
                      >
                        <Cell fill={data.color} />
                        <Cell fill="#F3F4F6" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Typography>{data.name}</Typography>
                <Typography variant="h6">{data.value}%</Typography>
              </Box>
            ))}
          </Box>
        </Card>

        {/* Order Chart */}
        <Card>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6">Chart Order</Typography>
              <Typography variant="body2" color="text.secondary">
                The number of orders by day of the week
              </Typography>
            </Box>
            <Button startIcon={<Download />} variant="outlined">
              Save Report
            </Button>
          </Box>
          <Box sx={{ p: 3, height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={orderChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#60A5FA"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      </Box>

      {/* Customer Reviews */}
      <Card>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Customer Review</Typography>
          <Typography variant="body2" color="text.secondary">
            Review food
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 3, p: 3, overflowX: 'auto' }}>
          {reviews.map((review) => (
            <Card key={review.id} sx={{ minWidth: 300, p: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Box
                  component="img"
                  src={`https://ui-avatars.com/api/?name=${review.name}`}
                  sx={{ width: 48, height: 48, borderRadius: '50%' }}
                />
                <Box>
                  <Typography fontWeight="bold">{review.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {review.time}
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ mb: 2 }}>{review.comment}</Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                {'★'.repeat(Math.floor(review.rating))}
                {review.rating % 1 !== 0 && '½'}
                {'☆'.repeat(5 - Math.ceil(review.rating))}
                <Typography>{review.rating}</Typography>
              </Box>
              <Box
                component="img"
                src={review.image}
                sx={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover',
                  borderRadius: 2,
                }}
              />
            </Card>
          ))}
        </Box>
      </Card>
    </Box>
  );
}

