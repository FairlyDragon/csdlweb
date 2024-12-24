import { Box, Card, Typography, Button } from "@mui/material";
import { Download } from "@mui/icons-material";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Monday", orders: 320 },
  { name: "Tuesday", orders: 340 },
  { name: "Wednesday", orders: 350 },
  { name: "Thursday", orders: 330 },
  { name: "Saturday", orders: 340 },
];

const CustomTooltip = (active, payload ) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: "#fff",
          p: 2,
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.08)",
          borderRadius: 2,
          minWidth: "120px",
        }}
      >
        <Typography
          sx={{
            color: "#212B36",
            fontSize: "0.875rem",
            fontWeight: 600,
            mb: 0.5,
          }}
        >
          {payload[0].value} Order
        </Typography>
        <Typography
          sx={{
            color: "#637381",
            fontSize: "0.75rem",
          }}
        >
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
        borderRadius: 4,
        bgcolor: "#fff",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 4,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              color: "#212B36",
              fontSize: "1.25rem",
              mb: 1,
            }}
          >
            Chart Order
          </Typography>
          <Typography
            sx={{
              color: "#637381",
              fontSize: "0.875rem",
            }}
          >
            The number of orders by day of the week
          </Typography>
        </Box>
        <Button
          startIcon={<Download />}
          sx={{
            color: "#2065D1",
            bgcolor: "transparent",
            border: "1px solid #2065D1",
            "&:hover": {
              bgcolor: "rgba(32, 101, 209, 0.08)",
            },
            textTransform: "none",
            borderRadius: 2,
            px: 2,
            py: 1,
            fontSize: "0.875rem",
            gap: 1,
          }}
        >
          Save Report
        </Button>
      </Box>

      <Box
        sx={{
          height: 120,
          width: "100%",
        }}
      >
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2065D1" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#2065D1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#919EAB",
                fontSize: "0.75rem",
                opacity: 0.8,
              }}
              dy={10}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#919EAB",
                strokeDasharray: "5 5",
                strokeWidth: 1,
                opacity: 0.3,
              }}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#2065D1"
              strokeWidth={2}
              fill="url(#colorOrders)"
              dot={{
                r: 3,
                fill: "#fff",
                stroke: "#2065D1",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 5,
                fill: "#2065D1",
                strokeWidth: 0,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}
