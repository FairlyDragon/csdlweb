import { Box, Card, Typography } from '@mui/material'
import { ShoppingBag, LocalShipping, Cancel, AttachMoney } from '@mui/icons-material'

const stats = [
  {
    title: 'Total Orders',
    value: '75',
    change: '+12% from last',
    icon: ShoppingBag,
    color: '#10B981',
    iconBg: '#E8F8F5',
    trend: 'up'
  },
  {
    title: 'Total Delivered',
    value: '357',
    change: '+8% from last',
    icon: LocalShipping,
    color: '#10B981',
    iconBg: '#E8F8F5',
    trend: 'up'
  },
  {
    title: 'Total Canceled',
    value: '65',
    change: '-2% from last',
    icon: Cancel,
    color: '#FF4842',
    iconBg: '#FFF5F5',
    trend: 'down'
  },
  {
    title: 'Total Revenue',
    value: '$128',
    change: '+18% from last',
    icon: AttachMoney,
    color: '#10B981',
    iconBg: '#E8F8F5',
    trend: 'up'
  },
]

export default function StatsCards() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
      {stats.map((stat) => {
        const Icon = stat.icon
        
        return (
          <Card 
            key={stat.title}
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  bgcolor: stat.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon 
                  sx={{ 
                    fontSize: 20,
                    color: stat.color
                  }} 
                />
              </Box>
              
              <Box sx={{ flex: 1 }}>
                <Typography 
                  sx={{ 
                    fontSize: 14,
                    color: '#637381',
                    mb: 0.5
                  }}
                >
                  {stat.title}
                </Typography>
                
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontSize: 24,
                    fontWeight: 700,
                    color: '#212B36',
                    mb: 0.5
                  }}
                >
                  {stat.value}
                </Typography>
                
                <Typography 
                  sx={{ 
                    fontSize: 13,
                    color: stat.trend === 'up' ? '#10B981' : '#FF4842',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}
                >
                  {stat.change}
                  <span style={{ color: '#637381' }}>month</span>
                </Typography>
              </Box>
            </Box>
          </Card>
        )
      })}
    </Box>
  )
}

