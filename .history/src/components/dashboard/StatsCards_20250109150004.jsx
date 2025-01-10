import { useState, useEffect } from 'react';
import { Box, Card, Typography } from '@mui/material'
import { ShoppingBag, LocalShipping, Cancel, AttachMoney } from '@mui/icons-material'
import { dashboardService } from '../../services/DashBoardService'

const UpArrow = () => (
  <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.393065 2.7956C0.481313 2.88455 0.600987 2.93451 0.72577 2.93451C0.850554 2.93451 0.970228 2.88455 1.05848 2.7956L1.90224 1.94494L1.90224 5.06957C1.90224 5.1954 1.95182 5.31607 2.04007 5.40505C2.12833 5.49402 2.24802 5.54401 2.37283 5.54401C2.49764 5.54401 2.61733 5.49402 2.70559 5.40505C2.79384 5.31607 2.84342 5.1954 2.84342 5.06957L2.84342 1.94494L3.68718 2.7956C3.77594 2.88203 3.89481 2.92985 4.01819 2.92877C4.14158 2.92768 4.25961 2.87779 4.34686 2.78982C4.43411 2.70186 4.4836 2.58287 4.48468 2.45847C4.48575 2.33408 4.43832 2.21423 4.35259 2.12475L2.70554 0.46423C2.61729 0.375287 2.49761 0.325322 2.37283 0.325322C2.24805 0.325322 2.12837 0.375287 2.04012 0.46423L0.393065 2.12475C0.304843 2.21372 0.255283 2.33438 0.255283 2.46018C0.255283 2.58598 0.304843 2.70663 0.393065 2.7956Z" fill="#00A389"/>
  </svg>
)

const DownArrow = () => (
  <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.928146 3.74445L2.5752 5.40498C2.66345 5.49392 2.78313 5.54388 2.90791 5.54388C3.03269 5.54388 3.15237 5.49392 3.24062 5.40498L4.88768 3.74445C4.9734 3.65497 5.02083 3.53513 5.01976 3.41074C5.01869 3.28634 4.96919 3.16735 4.88194 3.07938C4.79469 2.99142 4.67666 2.94152 4.55328 2.94044C4.42989 2.93936 4.31102 2.98718 4.22226 3.0736L3.3785 3.92426L3.3785 0.799635C3.3785 0.673807 3.32892 0.553133 3.24067 0.464159C3.15241 0.375186 3.03272 0.3252 2.90791 0.3252C2.7831 0.3252 2.66341 0.375185 2.57515 0.464159C2.4869 0.553133 2.43732 0.673807 2.43732 0.799635L2.43732 3.92426L1.59356 3.0736C1.5048 2.98718 1.38593 2.93936 1.26255 2.94044C1.13916 2.94152 1.02113 2.99142 0.933878 3.07938C0.846627 3.16735 0.797136 3.28634 0.796064 3.41074C0.794992 3.53513 0.842424 3.65497 0.928146 3.74445Z" fill="#FF5B5B"/>
  </svg>
)

export default function StatsCards() {
  const [stats, setStats] = useState(null);

  const fetchStats = async (dateRange = null) => {
    try {
      let response;
      if (dateRange) {
        response = await dashboardService.getHeader(dateRange.start_date, dateRange.end_date);
      } else {
        response = await dashboardService.getHeader();
      }
      
      setStats([
        {
          title: 'Total Orders',
          value: response.total_orders.figures,
          change: `${response.total_orders.growth_rate > 0 ? '+' : ''}${response.total_orders.growth_rate}%`,
          icon: ShoppingBag,
          color: '#10B981',
          iconBg: '#E8F8F5',
          trend: response.total_orders.growth_rate >= 0 ? 'up' : 'down',
          days: response.total_orders.days
        },
        {
          title: 'Total Delivered',
          value: response.total_delivered.figures,
          change: `${response.total_delivered.growth_rate > 0 ? '+' : ''}${response.total_delivered.growth_rate}%`,
          icon: LocalShipping,
          color: '#10B981',
          iconBg: '#E8F8F5',
          trend: response.total_delivered.growth_rate >= 0 ? 'up' : 'down',
          days: response.total_delivered.days
        },
        {
          title: 'Total Canceled',
          value: response.total_canceled.figures,
          change: `${response.total_canceled.growth_rate > 0 ? '+' : ''}${response.total_canceled.growth_rate}%`,
          icon: Cancel,
          color: '#FF4842',
          iconBg: '#FFF5F5',
          trend: response.total_canceled.growth_rate >= 0 ? 'up' : 'down',
          days: response.total_canceled.days
        },
        {
          title: 'Total Revenue',
          value: `$${response.total_revenue.figures}`,
          change: `${response.total_revenue.growth_rate > 0 ? '+' : ''}${response.total_revenue.growth_rate}%`,
          icon: AttachMoney,
          color: '#10B981',
          iconBg: '#E8F8F5',
          trend: response.total_revenue.growth_rate >= 0 ? 'up' : 'down',
          days: response.total_revenue.days
        }
      ]);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) return null;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
      {stats.map((stat) => {
        const Icon = stat.icon
        
        return (
          <Card 
            key={stat.title}
            sx={{
              p: 2.5,
              height: 'auto',
              borderRadius: 4,
              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.04)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  bgcolor: stat.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon 
                  sx={{ 
                    fontSize: 18,
                    color: stat.color
                  }} 
                />
              </Box>
              
              <Box sx={{ flex: 1 }}>
                <Typography 
                  sx={{ 
                    fontSize: 13,
                    color: '#637381',
                    mb: 0.5
                  }}
                >
                  {stat.title}
                </Typography>
                
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontSize: 22,
                    fontWeight: 700,
                    color: '#212B36',
                    mb: 0.5,
                    lineHeight: 1.2
                  }}
                >
                  {stat.value}
                </Typography>
                
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    fontSize: 12,
                    color: '#637381'
                  }}
                >
                  {stat.trend === 'up' ? <UpArrow /> : <DownArrow />}
                  <span style={{ color: stat.trend === 'up' ? '#00A389' : '#FF5B5B' }}>
                    {stat.change} ({stat.days} days)
                  </span>
                </Box>
              </Box>
            </Box>
          </Card>
        )
      })}
    </Box>
  )
}

