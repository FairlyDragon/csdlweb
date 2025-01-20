import { Box, Card, Typography } from '@mui/material';
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = {
  'Total Order': '#FF6B6B',
  'Customer Growth': '#4ADE80', 
  'Total Revenue': '#60A5FA'
};

export default function PieChartCard(data }) {
  return (
    <Card sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" mb={3}>Pie Chart</Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        {data.map((item) => (
          <Box key={item.name} sx={{ textAlign: 'center' }}>
            <Box sx={{ height: 120, position: 'relative' }}>
              <PieChart width={120} height={120}>
                <Pie
                  data={[
                    { value: item.value },
                    { value: 100 - item.value }
                  ]}
                  cx={60}
                  cy={60}
                  innerRadius={35}
                  outerRadius={45}
                  startAngle={90}
                  endAngle={450}
                >
                  <Cell fill={COLORS[item.name]} />
                  <Cell fill="#F3F4F6" />
                </Pie>
              </PieChart>
              <Typography
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: 20,
                  fontWeight: 'bold'
                }}
              >
                {item.value}%
              </Typography>
            </Box>
            <Typography fontSize={14} color="text.secondary" mt={1}>
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
}

