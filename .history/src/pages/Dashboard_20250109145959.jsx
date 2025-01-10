import { Box, Typography } from '@mui/material'
import FilterPeriod from '../components/dashboard/FilterPeriod'
import StatsCards from '../components/dashboard/StatsCards'
import PieCharts from '../components/dashboard/PieCharts'
import OrderChart from '../components/dashboard/OrderChart'
import RevenueChart from '../components/dashboard/RevenueChart'
import CustomerMap from '../components/dashboard/CustomerMap'
import CustomerReviews from '../components/dashboard/CustomerReviews'
import { useState } from 'react'

export default function Dashboard() {
  const [dateRange, setDateRange] = useState(null);

  const handleDateChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 1 }}>Dashboard</Typography>
          <Typography color="text.secondary">
            Hi, Admin, Welcome back to Fairy Dragon Admin!
          </Typography>
        </Box>
        <FilterPeriod onDateChange={handleDateChange} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <StatsCards dateRange={dateRange} />
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
          <PieCharts />
          <OrderChart />
        </Box>
        
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ flex: '1.8' }}>
            <RevenueChart />
          </Box>
          <Box sx={{ flex: '1' }}>
            <CustomerMap />
          </Box>
        </Box>
        
        <CustomerReviews />
      </Box>
    </Box>
  )
}

