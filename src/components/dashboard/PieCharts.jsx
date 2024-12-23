import { Box, Card, Typography, Checkbox, FormControlLabel } from '@mui/material'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Total Order', value: 81, color: '#ef4444' },
  { name: 'Customer Growth', value: 22, color: '#10b981' },
  { name: 'Total Revenue', value: 62, color: '#3b82f6' },
]

export default function PieCharts() {
  return (
    <Card sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Pie Chart</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Chart"
          />
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Show Value"
          />
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {data.map((item) => (
          <Box key={item.name} sx={{ textAlign: 'center' }}>
            <Box sx={{ height: 120 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[{ value: item.value }, { value: 100 - item.value }]}
                    innerRadius={30}
                    outerRadius={40}
                    startAngle={90}
                    endAngle={450}
                  >
                    <Cell fill={item.color} />
                    <Cell fill="#f3f4f6" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Typography sx={{ mt: 2, fontSize: '0.875rem', color: 'text.secondary' }}>
              {item.name}
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {item.value}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  )
}

