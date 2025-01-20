import { Box, Typography } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CancelIcon from '@mui/icons-material/Cancel';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StatsCard from '../components/dashboard/StatsCard';
import PieChartCard from '../components/dashboard/PieChartCard';
import OrderChart from '../components/dashboard/OrderChart';

const statsData = [
  {
    title: 'Total Orders',
    value: '75',
    change: '+12% from last month',
    icon: RestaurantIcon,
    color: '#00A76F'
  },
  {
    title: 'Total Delivered',
    value: '357',
    change: '+8% from last month',
    icon: LocalShippingIcon,
    color: '#00A76F'
  },
  {
    title: 'Total Canceled',
    value: '65',
    change: '-2% from last month',
    icon: CancelIcon,
    color: '#FF4842'
  },
  {
    title: 'Total Revenue',
    value: '$128',
    change: '+18% from last month',
    icon: AttachMoneyIcon,
    color: '#00A76F'
  }
];

const pieChartData = [
  { name: 'Total Order', value: 81 },
  { name: 'Customer Growth', value: 22 },
  { name: 'Total Revenue', value: 62 }
];

export default function Dashboard() {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>Dashboard</Typography>
        <Typography color="text.secondary">
          Hi, Admin, Welcome back to FairyDragon Admin!
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, mb: 3 }}>
        {statsData.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
        <PieChartCard data={pieChartData} />
        <OrderChart />
      </Box>
    </Box>
  );
}

