import { Box, Card, Typography } from '@mui/material';

export default function StatsCard({ title, value, change, icon: Icon, color }) {
  const isPositive = change.startsWith('+');
  
  return (
    <Card 
      sx={{ 
        p: 3,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        borderRadius: 2
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: `${color}14`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon sx={{ fontSize: 24, color: color }} />
        </Box>
        
        <Box>
          <Typography color="text.secondary" fontSize={14} mb={0.5}>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold" mb={0.5}>
            {value}
          </Typography>
          <Typography 
            fontSize={12} 
            color={isPositive ? 'success.main' : 'error.main'}
          >
            {change}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

