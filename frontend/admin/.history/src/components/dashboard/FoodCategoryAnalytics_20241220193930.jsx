import { Card, CardContent, CardHeader, Box } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const categoryData = [
  { category: 'Bánh mì', orders: 450 },
  { category: 'Phở', orders: 380 },
  { category: 'Cơm', orders: 320 },
  { category: 'Pizza', orders: 280 },
  { category: 'Burger', orders: 250 },
  { category: 'Sushi', orders: 220 },
];

export default function FoodCategoryAnalytics() {
  return (
    <Card sx={{ mt: 3 }}>
      <CardHeader title="Popular Food Categories" />
      <CardContent>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

