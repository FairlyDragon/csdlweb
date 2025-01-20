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
    bgColor: 'rgba(255, 107, 107, 0.16)'
  },
  { 
    name: 'Customer Growth', 
    value: 22, 
    color: '#4ADE80',
    bgColor: 'rgba(74, 222, 128, 0.16)'
  },
  { 
    name: 'Total Revenue', 
    value: 62, 
    color: '#60A5FA',
    bgColor: 'rgba(96, 165, 250, 0.16)'
  }
]

export default function PieCharts() {
  return (
    <Card 
      sx={{ 
        p: 3,
        boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
        borderRadius: '16px',
        bgcolor: '#FFFFFF'
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3
      }}>
        <Typography 
          sx={{ 
            fontSize: '18px',
            fontWeight: 600,
            color: '#111827',
            lineHeight: '28px'
          }}
        >
          Pie Chart
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Checkbox 
                size="small"
                sx={{
                  padding: '4px',
                  color: '#D1D5DB',
                  '&.Mui-checked': {
                    color: '#6366F1'
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: 20
                  }
                }}
              />
            }
            label={
              <Typography sx={{ 
                fontSize: '14px', 
                color: '#6B7280',
                ml: 0.5
              }}>
                Chart
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox 
                size="small"
                defaultChecked
                sx={{
                  padding: '4px',
                  color: '#D1D5DB',
                  '&.Mui-checked': {
                    color: '#6366F1'
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: 20
                  }
                }}
              />
            }
            label={
              <Typography sx={{ 
                fontSize: '14px', 
                color: '#6B7280',
                ml: 0.5
              }}>
                Show Value
              </Typography>
            }
          />
          <IconButton 
            size="small" 
            sx={{ 
              ml: 1,
              color: '#6B7280'
            }}
          >
            <MoreVert fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: 4,
        mt: 4
      }}>
        {data.map((item) => (
          <Box 
            key={item.name} 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Box sx={{ 
              position: 'relative',
              width: '160px',
              height: '160px'
            }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={[
                      { value: item.value },
                      { value: 100 - item.value }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={75}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    <Cell fill={item.color} strokeWidth={0} />
                    <Cell fill={item.bgColor} strokeWidth={0} />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <Typography
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#111827'
                }}
              >
                {item.value}%
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 500,
                color: '#6B7280',
                mt: 2
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

