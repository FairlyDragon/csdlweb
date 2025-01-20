import { Box, Card, Typography } from '@mui/material'
import { ShoppingBag, LocalShipping, Cancel, AttachMoney } from '@mui/icons-material'

const stats = [
  {
    title: 'Total Orders',
    value: '75',
    change: '+12% from last month',
    icon: ShoppingBag,
    color: '#10B981',
  },
  {
    title: 'Total Delivered',
    value: '357',
    change: '+8% from last month',
    icon: LocalShipping,
    color: '#10B981',
  },
  {
    title: 'Total Canceled',
    value: '65',
    change: '-2% from last month',
    icon: Cancel,
    color: '#EF4444',
  },
  {
    title: 'Total Revenue',
    value: '$128',
    change: '+18% from last month',
    icon: AttachMoney,
    color: '#10B981',
  },
]

export default function StatsCards() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
      {stats.map((stat) => {
        const Icon = stat.icon
        
        return (
          <Card key={stat.title}>
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: `${stat.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon sx={{ color: stat.color }} />
              </Box>
              
              <Box>
                <Typography color="text.secondary" fontSize="0.875rem" fontWeight="medium">
                  {stat.title}
                </Typography>
                <Typography variant="h4" fontWeight="bold" sx={{ my: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography color="text.secondary" fontSize="0.75rem">
                  {stat.change}
                </Typography>
              </Box>
            </Box>
          </Card>
        )
      })}
    </Box>
  )
}

