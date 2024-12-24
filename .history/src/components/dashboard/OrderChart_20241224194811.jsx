import { Box, Card, Typography, Button } from "@mui/material";
import { Download } from "@mui/icons-material";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Sunday", orders: 380 },
  { name: "Monday", orders: 400 },
  { name: "Tuesday", orders: 456 },
  { name: "Wednesday", orders: 350 },
  { name: "Thursday", orders: 400 },
  { name: "Friday", orders: 420 },
  { name: "Saturday", orders: 470 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: "#fff",
          p: 1.5,
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
          borderRadius: 1,
          border: "1px solid rgba(145, 158, 171, 0.12)",
        }}
      >
        <Typography sx={{ color: "#212B36", fontSize: 14, fontWeight: 600 }}>
          {payload[0].value} Order
        </Typography>
        <Typography sx={{ color: "#919EAB", fontSize: 12 }}>
          Oct 18th, 2023
        </Typography>
      </Box>
    );
  }
  return null;
};

export default function OrderChart() {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#212B36" }}>
            Chart Order
          </Typography>
          <Typography sx={{ color: "#637381", fontSize: 13 }}>
            The number of orders by day of the week
          </Typography>
        </Box>
        <Button
          startIcon={<Download sx={{ fontSize: 20 }} />}
          sx={{
            color: "#2065D1",
            bgcolor: "transparent",
            border: "1px solid #2065D1",
            "&:hover": {
              bgcolor: "rgba(32, 101, 209, 0.08)",
              border: "1px solid #2065D1"
            },
            textTransform: "none",
            borderRadius: 1,
            px: 2,
            py: 0.75,
            fontSize: 13,
          }}
        >
          Save Report
        </Button>
      </Box>

      <Box sx={{ height: 300, width: "100%", mt: 2 }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2065D1" stopOpacity={0.24} />
                <stop offset="95%" stopColor="#2065D1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#919EAB", fontSize: 12 }}
              dy={10}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#919EAB",
                strokeWidth: 1,
                strokeDasharray: "4 4"
              }}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#2065D1"
              strokeWidth={2}
              fill="url(#colorOrders)"
              dot={{ r: 4, fill: "#fff", stroke: "#2065D1", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "#2065D1", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}
