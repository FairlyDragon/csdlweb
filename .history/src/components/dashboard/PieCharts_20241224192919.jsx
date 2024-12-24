import { 
  Box, 
  Card, 
  Typography, 
  Checkbox, 
  FormControlLabel,
  IconButton
} from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const data = [
  { 
    name: 'Total Order', 
    value: 81, 
    color: '#FF6B6B',
    bgColor: '#FFF5F5'
  },
  { 
    name: 'Customer Growth', 
    value: 22, 
    color: '#4ADE80',
    bgColor: '#F0FDF4'
  },
  { 
    name: 'Total Revenue', 
    value: 62, 
    color: '#60A5FA',
    bgColor: '#EFF6FF'
  }
]

export default function PieCharts() {
  return (
    <Card 
      sx={{ 
        p: 3,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        borderRadius: 2
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4 
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontSize: '1.125rem',
            fontWeight: 600,
            color: '#111827'
          }}
        >
          Pie Chart
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FormControlLabel
            control={
              <Checkbox 
                size="small"
                sx={{
                  color: '#9CA3AF',
                  '&.Mui-checked': {
                    color: '#6366F1'
                  }
                }}
              />
            }
            label={
              <Typography sx={{ fontSize: '0.875rem', color: '#6B7280' }}>
                Chart
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox 
                size="small"
                sx={{
                  color: '#9CA3AF',
                  '&.Mui-checked': {
                    color: '#6366F1'
                  }
                }}
              />
            }
            label={
              <Typography sx={{ fontSize: '0.875rem', color: '#6B7280' }}>
                Show Value
              </Typography>
            }
          />
          <IconButton size="small">
            <MoreVert sx={{ color: '#6B7280' }} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: 2,
        textAlign: 'center'
      }}>
        {data.map((item) => (
          <Box key={item.name}>
            <Box sx={{ 
              position: 'relative',
              height: 140,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { value: item.value },
                      { value: 100 - item.value }
                    ]}
                    innerRadius={45}
                    outerRadius={55}
                    startAngle={90}
                    endAngle={450}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    <Cell fill={item.color} />
                    <Cell fill={item.bgColor} />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <Typography
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: '#111827'
                }}
              >
                {item.value}%
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: '#6B7280',
                mt: 1
              }}
            >
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  )
}

